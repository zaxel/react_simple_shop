import { makeAutoObservable, reaction, runInAction } from "mobx";
import { addCartDeviceReq, clearCartReq, deleteItemReq, getCartReq, mergeGuestCart, resolveGuestCartReq, updateQuantityReq } from "../http/cartAPI";
import { clearLocalStoreCartSnapshot, getLocalStoreCartSnapshot, setLocalStoreCartSnapshot } from "../utils/cart/localStoreCartSnapshot";

export default class CartStore {
    _items = [];
    _pendingItems = new Set();
    _mainStoreFieldName = 'cart';
    _root = null;
    constructor(root) {
        this._root = root;
        makeAutoObservable(this, {}, { autoBind: true });

        reaction(
            () => this._root.user.isAuth
                ? null
                : this._items.map(i => [i.deviceId, i.device_amount]),
            snapshot => {
                if (!snapshot) return;
                setLocalStoreCartSnapshot(
                    snapshot.map(([deviceId, device_amount]) => ({ deviceId, device_amount }))
                );
            },
            { delay: 300 }
        );


        reaction(
            () => this._root.user.isAuth,
            async isAuth => {
                if (!isAuth) {
                    await this.setCart();
                    return;
                }

                const snapshot = getLocalStoreCartSnapshot();
                if (snapshot.length) {
                    await mergeGuestCart(snapshot);
                    clearLocalStoreCartSnapshot();
                }
                
                await this.setCart();
            }
        );
    }

    async setCart() {
        const { isAuth } = this._root.user;
        try {
            let items = [];

            if (isAuth) {
                const data = await getCartReq();
                items = data.items;
            } else {

                const snapshot = getLocalStoreCartSnapshot();

                if (!snapshot.length) {
                    runInAction(() => this._items = []);
                    return;
                }

                const data = await resolveGuestCartReq(snapshot);
                items = data;
            }

            runInAction(() => {
                this._items = items ?? [];
            });
        } catch (error) {
            console.error('Failed to set cart:', error);
        }
    }

    async addDevice(storedDevice, quantity) {
        const { isAuth } = this._root.user;
        const deviceId = storedDevice.id;

        if (!deviceId) {
            console.error('Invalid device: missing ID');
            return;
        }

        if (isAuth) {

            if (this._pendingItems.has(deviceId)) {
                console.log('Request already pending for device:', deviceId);
                return;
            }

            this._pendingItems.add(deviceId);

            const existingItemIndex = this._items.findIndex(i => i?.deviceId === deviceId);
            const existingItem = existingItemIndex !== -1 ? this._items[existingItemIndex] : null;
            const previousQuantity = existingItem?.device_amount || 0;

            if (existingItem) {
                existingItem.device_amount += quantity;
            } else {
                this._items.push({
                    deviceId,
                    device_amount: quantity,
                    device: storedDevice,
                });
            }

            try {
                const data = await addCartDeviceReq(deviceId, quantity);
                runInAction(() => {
                    const index = this._items.findIndex(i => i?.deviceId === deviceId);
                    if (index !== -1) {
                        this._items[index] = {
                            ...data,
                            device: data.device || storedDevice
                        };
                    }
                })
            } catch (error) {
                runInAction(() => {
                    const index = this._items.findIndex(i => i?.deviceId === deviceId);

                    if (index !== -1) {
                        if (previousQuantity > 0) {
                            this._items[index].device_amount = previousQuantity;
                        } else {
                            this._items.splice(index, 1);
                        }
                    }
                })
                console.error('Failed to add to cart:', error);
                throw error;

            } finally {
                runInAction(() => {
                    this._pendingItems.delete(deviceId);
                })
            }
        } else {
            runInAction(() => {
                const item = this._items.find(i => i.deviceId === deviceId);
                if (item) {
                    item.device_amount += quantity;
                } else {
                    this._items.push({
                        device: storedDevice,
                        deviceId,
                        device_amount: quantity,
                    })
                }
            })
        }

    }

    async updateQuantity(deviceId, newQuantity) {
        const { isAuth } = this._root.user;

        if (this._pendingItems.has(deviceId) || newQuantity <= 0)
            return;

        const item = this._items.find(i => i?.deviceId === deviceId);
        if (!item) return;

        if (isAuth) {
            this._pendingItems.add(deviceId);

            const previousQuantity = item.device_amount;
            item.device_amount = newQuantity;

            try {
                const res = await updateQuantityReq({ itemId: deviceId, quantity: newQuantity })
            } catch (error) {
                runInAction(() => {
                    item.device_amount = previousQuantity;
                });
                console.error('Failed to update quantity:', error);
                throw error;
            } finally {
                runInAction(() => {
                    this._pendingItems.delete(deviceId);
                });
            }
        } else {
            runInAction(() => {
                item.device_amount = newQuantity;
            });
        }

    }

    async removeDevice(deviceId) {
        const { isAuth } = this._root.user;
        if (this._pendingItems.has(deviceId))
            return;

        const itemIndex = this._items.findIndex(i => i?.deviceId === deviceId);
        const removedItem = itemIndex !== -1 ? { ...this._items[itemIndex] } : null;
        if (!removedItem)
            return;

        if (isAuth) {
            runInAction(() => {
                this._pendingItems.add(deviceId);
                this._items.splice(itemIndex, 1);
            });
            try {
                await deleteItemReq(deviceId);
            } catch (error) {
                runInAction(() => {
                    this._items.splice(itemIndex, 0, removedItem);
                });
                console.error('Failed to remove item:', error);
                throw error;
            } finally {
                runInAction(() => {
                    this._pendingItems.delete(deviceId);
                });
            }
        } else {
            runInAction(() => {
                this._items.splice(itemIndex, 1);
            });
        }
    }

    async clearCart(frontOnly = false) {
        if (frontOnly) {
            runInAction(() => {
                this._items = [];
            });
            return;
        }

        if (this._pendingItems.has('clear-cart')) return;

        const previousItems = [...this._items];

        runInAction(() => {
            this._pendingItems.add('clear-cart');
            this._items = [];
        });

        try {
            await clearCartReq();
        } catch (error) {
            runInAction(() => {
                this._items = previousItems;
            });
            console.error('Failed to clear cart:', error);
            throw error;
        } finally {
            runInAction(() => {
                this._pendingItems.delete('clear-cart');
            });
        }
    }

    get cart() {
        return this._items;
    }

    get itemsCount() {
        return this._items.reduce((sum, item) => sum + (item.device_amount || 0), 0);
    }

    get cartTotal() {
        return this._items.reduce((sum, item) => {
            const price = item.device?.price || 0;
            const amount = item.device_amount || 0;
            return sum + (price * amount);
        }, 0);
    }
    get mainStoreFieldName() {
        return this._mainStoreFieldName;
    }
}
