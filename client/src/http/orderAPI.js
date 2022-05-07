import { $authHost, $host } from ".";

export const createOrder = async (order, basketId) => {
    
    const {data} = await $authHost.post('api/order', {order, basketId});

    return data;
}
