import { $authHost, $host } from ".";

export const addCartDeviceReq = async (deviceId, quantity) => {
   try{
       const { data } = await $authHost.post(`api/cart/items`, {deviceId, quantity}); 
       return data;
   }catch(err){
        console.log(err); 
        throw err;
   }
}

export const getCartReq = async () => {
    try{
       const {data} = await $authHost.get('api/cart');
        return data;
   }catch(err){
        console.log(err);
        throw err;
   }
}

export const updateQuantityReq = async ({itemId, quantity}) => {
    try{
       const {data} = await $authHost.patch(`api/cart/items/${itemId}`, {quantity});
        return data;
   }catch(err){
        console.log(err);
        throw err;
   }
}

export const deleteItemReq = async (deviceId) => {
    try{
       const {data} = await $authHost.delete(`api/cart/items/${deviceId}`);
        return data;
   }catch(err){
        console.log(err);
        throw err;
   }
}

export const clearCartReq = async () => {
    try{
       const {data} = await $authHost.delete(`api/cart`);
        return data;
   }catch(err){
        console.log(err);
        throw err;
   }
}

export const resolveGuestCartReq = async (snapshot) => {
    try{
       const {data} = await $host.post(`api/cart/from-snapshot`, {snapshot});
        return data;
   }catch(err){
        console.log(err);
        throw err;
   }
}

export const mergeGuestCart = async (snapshot) => {
    try{
       const {data} = await $authHost.post(`api/cart/merge`, {items: snapshot});
        return data;
   }catch(err){
        console.log(err);
        throw err;
   }
}

