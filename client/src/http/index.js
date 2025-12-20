import axios from 'axios';
import { removeEmptyParams } from '../utils/http/requestInterceptorServ';

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true
});

const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true
});

$host.interceptors.request.use(config => {
    removeEmptyParams(config);
    return config;
});

$authHost.interceptors.request.use(config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    removeEmptyParams(config);
    return config;
});

$authHost.interceptors.response.use(
    null, 
    async (error) => {
        const originalRequest = error.config;
        if(error.response?.status === 401 && !originalRequest?._isRetry) {
            originalRequest._isRetry = true;
            try {
                const { data } = await $host.get('api/user/refresh');
                localStorage.setItem('token', data.accessToken);
                originalRequest.headers.authorization = `Bearer ${data.accessToken}`;
                return $authHost.request(originalRequest);
            } catch (e) {
                console.error('Refresh token failed', e);
                throw e; 
            }
        }
        if(error.response?.status === 403) {
            throw new Error(error.response?.data?.message || 'Forbidden');
        }
        throw error;
    }
);
export { $host, $authHost };
