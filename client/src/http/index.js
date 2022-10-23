import axios from 'axios';
import { removeEmptyParams } from '../utils/http/requestInterceptorServ';

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true 
})
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true 
})
const requestInterceptor = config => {
    removeEmptyParams(config);
    return config;
}
const authRequestInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
    removeEmptyParams(config);
    return config;
}

const authResponseInterceptor = config => {
    return config;
}

const authResponseErrorCb = async (error) => {
    const originalRequest = error.config;
    if(error.response.status === 401 && error.config && !error.config._isRetry){
        originalRequest._isRetry = true;
        try{
            const {data} = await axios.get('api/user/refresh', {
                baseURL: process.env.REACT_APP_API_URL,
                withCredentials: true 
            });
            localStorage.setItem('token', data.accessToken);
            return await $authHost.request(originalRequest);
        }catch(e){
            console.log(e.message);
        }
    }
    if(error.response.status === 403){
        alert(error.response.data.message);
        return 'error';
    }
   throw error;
}

$host.interceptors.request.use(requestInterceptor);

$authHost.interceptors.request.use(authRequestInterceptor);
$authHost.interceptors.response.use(authResponseInterceptor, authResponseErrorCb);

export {
    $host,
    $authHost
}
