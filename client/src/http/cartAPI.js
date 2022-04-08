import { $authHost, $host } from ".";

export const getCart = async (userId) => {
    const {data} = await $authHost.post('api/cart/get', { userId });
    return data;
}
export const createOrUpdateCartDevice = async (basketId, deviceId, device_amount) => {
    const {data} = await $authHost.post('api/cart', { basketId, deviceId, device_amount });
    return data;
}