import {$host, $authHost} from ".";

export const fetchAppPage = async () => {
    const {data} = await $host.get(`api/app`); 
    return data;
}

export const updateAppPage = async (id, dbFieldName, data) => {
    const updatedData = await $authHost.put('api/page' , {id, [dbFieldName]: data});
    return updatedData.data;
}
export const updateAppCardImg = async (formData) => {
    const { data } = await $authHost.patch('api/app/card/img-update/' , formData);
    return data; 
}
export const updateAppCardData = async (id, dbFieldName, data) => {
    const updatedData = await $authHost.put('api/app/card' , {id, [dbFieldName]: data});
    return updatedData.data;
}


