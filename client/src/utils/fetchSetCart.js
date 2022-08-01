import { getCart, createOrUpdateCartDevice, deleteCartDevice, getBasketId } from "../http/cartAPI";
import { fetchAllDevices } from "../http/deviceAPI";
import { setLocalStoreCart } from "./setLocalStoreCart";
import { logoutOnClient } from "./logout";
const addAmountToExisted = false;

export const setCartId = async (cartStore, userStore) => {
    try {
        const basketId = await getBasketId();
        cartStore.setCartId(basketId);
    } catch (e) {
        if (e.response.status === 401 && userStore.isAuth) {
            logoutOnClient(cartStore, userStore);
            alert('Session timed out. You have to login again to continue (fetchSetCart1).');
        }
        console.log(e);
        throw e;
    }
}

export const fetchCartDevices = async (cart) => {
    try {
        const fetchDevicesId = cart.cart.map(device => device.deviceId);
        const basketDevices = await fetchAllDevices(null, null, null, null, fetchDevicesId)
        cart.setCartDevices(basketDevices.rows);
    } catch (e) {
        console.log(e)
        throw e;
    }
}

export const fetchSetCart = async (userStore, cartStore) => {
    try {
        const cartData = await getCart(userStore.user.id);
        cartStore.setCart(cartData.rows);
        cartStore.calcItemsCount();

        fetchCartDevices(cartStore);
    } catch (e) {
        if (e.response.status === 401 && userStore.isAuth) {
            logoutOnClient(cartStore, userStore);
            alert('Session timed out. You have to login again to continue. (fetchSetCart2)');
        }
        console.log(e)
        throw e;
    }
}

export const fetchCartOnAuth = async (user, cart) => {
    const setDevices = cart.cart.map(device => {
        return {
            basketId: cart.cartId,
            deviceId: device.deviceId,
            device_amount: device.device_amount
        }
    });

    const data = await createOrUpdateCartDevice(setDevices, true, user.user.id);
    const cartData = await getCart(user.user.id);
    cart.setCart(cartData.rows);
    cart.calcItemsCount();
    await fetchCartDevices(cart);
}

export const updateDeviceAmount = async (userStore, cartStore, basketId, deviceId, device_amount) => {
    try {
        if (userStore.isAuth) {
            const cartItem = [{ basketId, deviceId, device_amount }];
            await createOrUpdateCartDevice(cartItem, addAmountToExisted, userStore.user.id);
        }
        cartStore.setDeviceAmount(device_amount, deviceId);
    } catch (e) {
        if (e.response.status === 401 && userStore.isAuth) {
            logoutOnClient(cartStore, userStore);
            alert('Session timed out. You have to login again to continue. (fetchSetCart3)');
        }
        console.log(e);
        throw e;
    }
}

export const deleteDevice = async (userStore, cartStore, basketId, deviceId) => {
    try {
        if (userStore.isAuth) {
            const cartData = await deleteCartDevice(basketId, deviceId, userStore.user.id);
        }
        cartStore.deleteCart(deviceId);
        cartStore.deleteCartDevices(deviceId);
        cartStore.calcItemsCount();
        cartStore.setCartTotal();
        setLocalStoreCart(cartStore);
    } catch (e) {
        if (e.response.status === 401 && userStore.isAuth){
            logoutOnClient(cartStore, userStore);
            alert('Session timed out. You have to login again to continue. (fetchSetCart4)');
        }
        console.log(e);
        throw e;
    }
}
