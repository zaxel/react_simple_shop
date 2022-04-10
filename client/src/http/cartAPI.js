import { $authHost, $host } from ".";

export const getCart = async (userId) => {
    const {data} = await $authHost.post('api/cart/get', { userId });
    return data;
}
export const createOrUpdateCartDevice = async (basketId, deviceId, device_amount) => {
    const {data} = await $authHost.post('api/cart', { basketId, deviceId, device_amount });
    return data;
}
export const deleteCartDevice = async (basketId, deviceId) => {
    const {data} = await $authHost.delete('api/cart', { params: {basketId, deviceId} });
    return data;
}
export const getBasketId = async (userId) => {
    const {data} = await $authHost.get('api/cart/basketId');
    return data;
}