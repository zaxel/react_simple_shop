import { $authHost, $host } from ".";

export const getCart = async (userId) => {
    const {data} = await $authHost.get('api/cart/get', {params: { userId }});
    return data;
}
export const createOrUpdateCartDevice = async (items, addAmountToExisted) => {
    const {data} = await $authHost.post('api/cart', { items, addAmountToExisted});
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