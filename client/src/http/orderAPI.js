import { $authHost, $host } from ".";

export const createOrder = async (order, basketId) => {
    
    const {data} = await $authHost.post('api/order', {order, basketId});

    return data;
}

export const getOrders = async (sortBy, sortDirection, limit, page, searchBy, searchPrase) => {
    const {data} = await $authHost.get('api/order/' , {params:{
        sortBy, sortDirection, limit, page, searchBy, searchPrase
    }});
    return data;
}
export const updateOrder = async (id, dbFieldName, data) => {
    // const updatedData = await $authHost.put('api/user/' , {id, [dbFieldName]: data});
    // return updatedData.data;
    console.log('updateOrder')
}
export const deleteOrderReq = async (id) => {
    // const deletedUser = await $authHost.delete('api/user/' , {
    //     data: {id}
    //   });
    // return deletedUser.data;
    console.log('deleteOrderReq')
}
