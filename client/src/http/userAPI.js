import { $authHost, $host } from ".";
import {jwtDecode} from "jwt-decode";

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'USER'});
    localStorage.setItem('token', data.accessToken);
    return jwtDecode(data.accessToken);
}
export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password});
    localStorage.setItem('token', data.accessToken);
    return jwtDecode(data.accessToken);
}
export const logout = async () => {
    const {data} = await $host.post('api/user/logout');
    return data;
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/check');
    localStorage.setItem('token', data.accessToken);
    return jwtDecode(data.accessToken);
}

export const getUsers = async (id, sortBy, sortDirection, limit, page, searchBy, searchPrase) => {
    const {data} = await $authHost.get('api/user/' , {params:{
        sortBy, sortDirection, limit, page, searchBy, searchPrase
    }});
    return data;
}
export const updateUser = async (id, dbFieldName, data) => {
    const updatedData = await $authHost.put('api/user/' , {id, [dbFieldName]: data});
    return updatedData.data;
}
export const deleteUserReq = async (id) => {
    const deletedUser = await $authHost.delete('api/user/' , {
        data: {id}
      });
    return deletedUser.data;
}


export const addAddress = async (userId, newAddress) => {
    try{
        const resp = await $authHost.post(`api/user/${userId}/addresses`, newAddress);
        return resp.data;

    }catch(err){
        console.log(err);
        return null;
    }
}
export const updateAddress = async (userId, addressId, addressInfo) => {
    try{
        const resp = await $authHost.patch(`api/user/${userId}/addresses/${addressId}`, addressInfo);
        return resp.data;

    }catch(err){
        console.log(err);
        return null;
    }
}
export const deleteAddress = async (userId, addressId) => {
    try{
        const resp = await $authHost.delete(`api/user/${userId}/addresses/${addressId}`);
        return resp.data;

    }catch(err){
        console.log(err);
        return null;
    }
}
export const setDefaultAddress = async (userId, addressId) => {
    try{
        const resp = await $authHost.patch(`api/user/${userId}/addresses/${addressId}/default`);
        return resp.data;

    }catch(err){
        console.log(err);
        return null;
    }
}

export const updateUserData = async (userId, data) => {
    try{
        const resp = await $authHost.patch(`api/user/info/${userId}`, data); 
        return resp.data;
    }catch(err){
        console.log(err);
        return null;
    }
}



export const addWishItem = async (userId, deviceId) => {
    try{
        const resp = await $authHost.post(`api/user/${userId}/wishlist/${deviceId}`);
        return resp.data; 

    }catch(err){
        console.log(err);
        return null;
    }
}
export const getWishItems = async (userId) => {
    try{ 
        const resp = await $authHost.get(`api/user/${userId}/wishlist`);
        return resp.data;

    }catch(err){
        console.log(err);
        return null;
    }
}

export const getWishItemsList = async (userId) => {
    try{ 
        const resp = await $authHost.get(`api/user/${userId}/wishitems`);
        return resp.data;

    }catch(err){
        console.log(err);
        return null;
    }
}
export const deleteWishItem = async (userId, deviceId) => {
    try{
        const resp = await $authHost.delete(`api/user/${userId}/wishlist/${deviceId}`);
        return resp.data;

    }catch(err){
        console.log(err);
        return null;
    }
}