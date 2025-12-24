import { $authHost } from ".";

export const createOrder = async (order, basketId) => {
    const {data} = await $authHost.post('api/order', {order, basketId});
    return data;
}

export const getOrders = async (id, sortBy, sortDirection, limit, page, searchBy, searchPhrase) => {
    const {data} = await $authHost.get('api/order/' , {params:{
        sortBy, sortDirection, limit, page, searchBy, searchPhrase
    }});
    return data; 
}
export const updateOrder = async (id, dbFieldName, data) => {
    // const updatedData = await $authHost.put('api/user/' , {id, [dbFieldName]: data});
    // return updatedData.data;
    console.log('updateOrder')
}
export const deleteOrderReq = async (id) => {
    const deletedOrder = await $authHost.delete('api/order/' , {
        data: {id}
      });
    return deletedOrder.data;
}
export const fetchOrderDetailsReq = async (id, sortBy, sortDirection) => {
    const {data} = await $authHost.get(`api/order/details/${id}` , {params:{
        sortBy, sortDirection
    }});
    return data;
}


export const checkout = async ({order}) => {
    try{
        const resp = await $authHost.post(`api/order/checkout`, {order});
        return resp.data;

    }catch(err){
        console.error(err);
        return null;
    }
}

export const resolveBySession = async ({sessionId}) => {
    try{
        const resp = await $authHost.get(`api/order/resolve-by-session/${sessionId}`);
        return resp.data;

    }catch(err){
        console.error(err);
        return null;
    }
}