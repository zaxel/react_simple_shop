import { createOrUpdateCartDevice } from "../http/cartAPI";
import { setLocalStoreCart } from "./setLocalStoreCart";
import { fetchCartDevices } from "./fetchSetCart";
import { logoutOnClient } from "./logout";
const addAmountToExisted = true;

export const addToCart = async (cartStore, userStore, isAuth, basketId, deviceId, device_amount, userId) => {
    cartStore.addDevice(basketId, deviceId, device_amount);
    cartStore.increaseItemsCount();
    await fetchCartDevices(cartStore, userStore);
    cartStore.setCartTotal();
    setLocalStoreCart(cartStore);

    if (isAuth) {
        try {
            const cartItem = [{ basketId, deviceId, device_amount }];
            await createOrUpdateCartDevice(cartItem, addAmountToExisted, userId);
        } catch (e) {
            if (e.response.status === 401 && userStore.isAuth) {
                logoutOnClient(cartStore, userStore);
                alert('Session timed out. You have to login again to continue."');
            }
            throw e;
        }

    }

}
