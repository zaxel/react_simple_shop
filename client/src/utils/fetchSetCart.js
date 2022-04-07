import { getCart } from "../http/cartAPI";
import { fetchSingleDevice } from "../http/deviceAPI";

export const fetchSetCart = async(user, cart)=>{
    const cartData = await getCart(user.user.id);
    cart.setCart(cartData.rows);
    cart.setItemsCount(cartData.count);

    const fetchDevices = cartData.rows.map(device=>fetchSingleDevice(device.deviceId));
    const basketDevices = await Promise.all(fetchDevices);
    cart.setCartDevices(basketDevices);
}