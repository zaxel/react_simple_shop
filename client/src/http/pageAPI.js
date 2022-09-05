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




export const fetchAboutPage = async () => {
    const {data} = await $host.get(`api/about`); 
    return data;
}
export const fetchAboutCard = async ({cardId}) => {
    const {data} = await $host.get(`api/about/card/${cardId}`); 
    return data;
}
export const fetchAboutBlocks = async ({infoAboutCardId}) => {
    const {data} = await $host.get(`api/about/blocks`, {params:{
        infoAboutCardId
    }}); 
    return data;
}

export const updateAboutPage = async (id, dbFieldName, data) => {
    const updatedData = await $authHost.put('api/page' , {id, [dbFieldName]: data});
    return updatedData.data;
}
// export const updateAppCardImg = async (formData) => {
//     const { data } = await $authHost.patch('api/app/card/img-update/' , formData);
//     return data; 
// }
export const updateAboutCardData = async (id, dbFieldName, data) => {
    const updatedData = await $authHost.put('api/about/card' , {id, [dbFieldName]: data});
    return updatedData.data;
}
export const updateAboutBtnData = async (id, dbFieldName, data) => {
    const updatedData = await $authHost.put('api/about/btn' , {id, [dbFieldName]: data});
    return updatedData.data;
}


