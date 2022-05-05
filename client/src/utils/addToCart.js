import { createOrUpdateCartDevice } from "../http/cartAPI";
import { setLocalStoreCart } from "./setLocalStoreCart";
import { fetchCartDevices } from "./fetchSetCart";
const addAmountToExisted = true;
export const addToCart = async (cart, isAuth, basketId, deviceId, device_amount, userId) => {
    cart.addDevice(basketId, deviceId, device_amount);
    cart.increaseItemsCount();
    await fetchCartDevices(cart);
    cart.setCartTotal();
    setLocalStoreCart(cart);

    if (isAuth) {
        const cartItem = [{ basketId, deviceId, device_amount }];
        await createOrUpdateCartDevice(cartItem, addAmountToExisted, userId);
    }

}
