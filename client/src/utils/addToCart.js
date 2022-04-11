import { createOrUpdateCartDevice } from "../http/cartAPI";
import { setLocalStoreCart } from "./setLocalStoreCart";
import { fetchCartDevices } from "./fetchSetCart";

export const addToCart = async(cart, isAuth, basketId, deviceId, device_amount) => {
    cart.addDevice(basketId, deviceId, device_amount);
    cart.increaseItemsCount();
    fetchCartDevices(cart);
    setLocalStoreCart(cart);

    if(isAuth){
        const amount = cart.cart.find(el=>el.deviceId===deviceId).device_amount;
        await createOrUpdateCartDevice(basketId, deviceId, amount); 
    }
    
}