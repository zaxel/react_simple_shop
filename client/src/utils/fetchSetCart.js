import { getCart,  createOrUpdateCartDevice, deleteCartDevice} from "../http/cartAPI";
import { fetchSingleDevice } from "../http/deviceAPI";

export const fetchSetCart = async(user, cart)=>{
    const cartData = await getCart(user.user.id);
    cart.setCart(cartData.rows);
    cart.setItemsCount(cartData.count);

    const fetchDevices = cartData.rows.map(device=>fetchSingleDevice(device.deviceId));
    const basketDevices = await Promise.all(fetchDevices);
    cart.setCartDevices(basketDevices);
}
export const updateDeviceAmount = async(cart, basketId, deviceId, device_amount)=>{
    const cartData = await createOrUpdateCartDevice(basketId, deviceId, device_amount);

    cart.setDeviceAmount(device_amount, deviceId);
}
export const deleteDevice = async(cart, basketId, deviceId)=>{
    const cartData = await deleteCartDevice(basketId, deviceId);
    cart.deleteCart(deviceId);
    cart.deleteCartDevices(deviceId);
    cart.decreaseItemsCount();
}
