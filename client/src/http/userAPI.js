import { $authHost, $host } from ".";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'USER'});
    localStorage.setItem('token', data.accessToken);
    return jwt_decode(data.accessToken);
}
export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password});
    localStorage.setItem('token', data.accessToken);
    return jwt_decode(data.accessToken);
}
export const logout = async () => {
    const {data} = await $host.post('api/user/logout');
    return data;
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/check');
    localStorage.setItem('token', data.accessToken);
    return jwt_decode(data.accessToken);
}

export const getUsers = async (sortBy, sortDirection, limit, page) => {
    const {data} = await $authHost.get('api/user/' , {params:{
        sortBy, sortDirection, limit, page
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