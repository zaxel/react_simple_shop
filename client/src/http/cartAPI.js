import { $authHost, $host } from ".";

export const getCart = async (userId) => {
    const {data} = await $authHost.get('api/cart/get', {params: { userId }});
    return data;
}
export const createOrUpdateCartDevice = async (items, addAmountToExisted, userId) => {
    const {data} = await $authHost.post(`api/cart?userId=${userId}`, {items, addAmountToExisted});
    return data;
}
export const deleteCartDevice = async (basketId, deviceId, userId) => {
    const {data} = await $authHost.delete('api/cart', { params: {basketId, deviceId, userId} });
    return data;
}
export const getBasketId = async (userId) => {
    const {data} = await $authHost.get('api/cart/basketId');
    return data;
}