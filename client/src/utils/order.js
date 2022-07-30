import { createOrder } from "../http/orderAPI";
import { logoutOnClient } from "./logout";

export const makeOrder = async (setPayed, cartStore, userStore) => {
    try {
        const orderDevices = cartStore.cart.map(device => {
            return { deviceId: device.deviceId, amount: device.device_amount }
        })
        const data = await createOrder(orderDevices, cartStore.cartId);
        cartStore.clearCart();
        setPayed(true);
    } catch (e) {
        if (e.response.status === 401) {
            logoutOnClient(cartStore, userStore);
        }
        throw e;
    }
}

export const makeItems = (cartStore) => {
    const items = cartStore.cartDevices.map((device, i)=>{
        const count = cartStore.cart.find(el=>el.deviceId===device.id).device_amount;
        return <div key={device.id} className='checkout__item-row'>
            <div className='checkout__item-title'>{device.name}</div>
            <div className='checkout__count'>x {count}</div>
            <div className='checkout__price'>${device.price}</div>
        </div>
    })
    return items;
}


