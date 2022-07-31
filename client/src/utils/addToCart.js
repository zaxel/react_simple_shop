import { createOrUpdateCartDevice } from "../http/cartAPI";
import { setLocalStoreCart } from "./setLocalStoreCart";
import { fetchCartDevices } from "./fetchSetCart";
import { logoutOnClient } from "./logout";
const addAmountToExisted = true;

export const addToCart = async (cart, user, isAuth, basketId, deviceId, device_amount, userId) => {
    cart.addDevice(basketId, deviceId, device_amount);
    cart.increaseItemsCount();
    await fetchCartDevices(cart, user);
    cart.setCartTotal();
    setLocalStoreCart(cart);

    if (isAuth) {
        try {
            const cartItem = [{ basketId, deviceId, device_amount }];
            await createOrUpdateCartDevice(cartItem, addAmountToExisted, userId);
        } catch (e) {
            if (e.response.status === 401) {
                logoutOnClient(cart, user);
                alert('Session timed out. You have to login again to continue."');
            }
            throw e;
        }

    }

}
