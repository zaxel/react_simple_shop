import { getCart,  createOrUpdateCartDevice, deleteCartDevice, getBasketId} from "../http/cartAPI";
import { fetchAllDevices } from "../http/deviceAPI";
import { setLocalStoreCart } from "./setLocalStoreCart";
const addAmountToExisted = false;

export const setCartId = async(cart) => {
    const basketId = await getBasketId();
    cart.setCartId(basketId);
}

export const fetchCartDevices = async(cart) => {
    const fetchDevicesId = cart.cart.map(device=>device.deviceId);
    const basketDevices = await fetchAllDevices(null, null, null, null, fetchDevicesId)
    cart.setCartDevices(basketDevices.rows);
}

export const fetchSetCart = async(user, cart)=>{
    const cartData = await getCart(user.user.id);
    cart.setCart(cartData.rows);
    cart.calcItemsCount();

    fetchCartDevices(cart);
    
}
export const fetchUpdateCart = async(user, cart)=>{
    const cartData = await getCart(user.user.id);
    cart.updateCart(cartData.rows);
    cart.calcItemsCount();

    fetchCartDevices(cart);
    
}
export const fetchCartOnAuth = async(user, cart)=>{
    const setDevices = cart.cart.map(device=>{
        return {
            basketId: cart.cartId, 
            deviceId: device.deviceId, 
            device_amount: device.device_amount
        }
    });
            
    const data = await createOrUpdateCartDevice(setDevices, true);
    const cartData = await getCart(user.user.id);
    cart.setCart(cartData.rows);
    cart.calcItemsCount();
    await fetchCartDevices(cart);
}
export const updateDeviceAmount = async(user, cart, basketId, deviceId, device_amount)=>{
    if(user.isAuth){
        const cartItem = [{basketId, deviceId, device_amount}];
        await createOrUpdateCartDevice(cartItem, addAmountToExisted);
    }

    cart.setDeviceAmount(device_amount, deviceId);
}
export const deleteDevice = async(user, cart, basketId, deviceId)=>{
    if(user.isAuth){
        const cartData = await deleteCartDevice(basketId, deviceId);
    }
    cart.deleteCart(deviceId);
    cart.deleteCartDevices(deviceId);
    cart.calcItemsCount();
    cart.setCartTotal();
    setLocalStoreCart(cart);
}
