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
        if (e.response.status === 401) {
            logoutOnClient(cartStore, userStore);
        }
        console.log(e);
        alert('Session timed out. You have to login again to continue."');
        throw e;
    }

}

export const fetchCartDevices = async (cart, user) => {
    try {
        const fetchDevicesId = cart.cart.map(device => device.deviceId);
        const basketDevices = await fetchAllDevices(null, null, null, null, fetchDevicesId)
        cart.setCartDevices(basketDevices.rows);
    } catch (e) {
        if (e.response.status === 401) {
            logoutOnClient(cart, user);
        }
        console.log(e)
        alert('Session timed out. You have to login again to continue."');
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
        if (e.response.status === 401) {
            logoutOnClient(cartStore, userStore);
        }
        console.log(e)
        alert('Session timed out. You have to login again to continue."');
        throw e;
    }
}
// export const fetchUpdateCart = async(user, cart)=>{
//     const cartData = await getCart(user.user.id);
//     cart.updateCart(cartData.rows);
//     cart.calcItemsCount();

//     fetchCartDevices(cart);

// }
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
export const updateDeviceAmount = async (user, cart, basketId, deviceId, device_amount) => {
    try {
        if (user.isAuth) {
            const cartItem = [{ basketId, deviceId, device_amount }];
            await createOrUpdateCartDevice(cartItem, addAmountToExisted, user.user.id);
        }
        cart.setDeviceAmount(device_amount, deviceId);
    } catch (e) {
        if (e.response.status === 401) {
            logoutOnClient(cart, user);
        }
        console.log(e);
        alert('Session timed out. You have to login again to continue."');
        throw e;
    }
}
export const deleteDevice = async (user, cart, basketId, deviceId) => {

    try {
        if (user.isAuth) {
            const cartData = await deleteCartDevice(basketId, deviceId, user.user.id);
        }
        cart.deleteCart(deviceId);
        cart.deleteCartDevices(deviceId);
        cart.calcItemsCount();
        cart.setCartTotal();
        setLocalStoreCart(cart);
    } catch (e) {
        if (e.response.status === 401) {
            logoutOnClient(cart, user);
        }
        console.log(e);
        alert('Session timed out. You have to login again to continue."');
        throw e;
    }
}
