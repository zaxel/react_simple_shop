import { $authHost, $host } from ".";

export const getCart = async (userId) => {
    const {data} = await $authHost.post('api/cart/get', { userId });
    return data;
}