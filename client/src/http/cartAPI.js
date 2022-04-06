import { $authHost, $host } from ".";

export const getCart = async (basketId) => {
    const {data} = await $authHost.post('api/cart/get', { basketId });

    // localStorage.setItem('token', data.token);
    return data;
}