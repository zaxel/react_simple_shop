﻿import { $authHost, $host } from ".";
import jwt_decode from "jwt-decode";

export const registration = async (email, password) => {
    const {data} = await $host.post('api/user/registration', {email, password, role: 'ADMIN'});
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
    const {data} = await $authHost.get('api/user/auth');
    localStorage.setItem('token', data.accessToken);
    return jwt_decode(data.accessToken);
}