import axios from 'axios';

const $host = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true 
})
const $authHost = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true 
})
const authRequestInterceptor = config => {
    config.headers.authorization = `Bearer ${localStorage.getItem('token')}`;
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
        try{
            alert(error.response.data.message);
            return 'error';
        }catch(e){
            console.log(e.message);
        }
    }
    throw new Error('error in rejection interceptor cb');
}

$authHost.interceptors.request.use(authRequestInterceptor);
$authHost.interceptors.response.use(authResponseInterceptor, authResponseErrorCb);

export {
    $host,
    $authHost
}
