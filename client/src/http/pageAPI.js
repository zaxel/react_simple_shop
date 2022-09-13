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
export const updateAboutPage = async (id, dbFieldName, data) => {
    const updatedData = await $authHost.put('api/page' , {id, [dbFieldName]: data});
    return updatedData.data;
}


export const fetchAboutCard = async ({cardId}) => {
    const {data} = await $host.get(`api/about/card/${cardId}`); 
    console.log(data)
    return data;
}
export const updateAboutCardImg = async (formData) => {
    const { data } = await $authHost.patch('api/about/card/img-update/' , formData);
    return data; 
}
export const updateAboutCardData = async (id, dbFieldName, data) => {
    const updatedData = await $authHost.put('api/about/card' , {id, [dbFieldName]: data});
    return updatedData.data;
}



export const fetchAboutBlocks = async ({infoAboutCardId}) => {
    const {data} = await $host.get(`api/about/blocks`, {params:{
        infoAboutCardId
    }}); 
    return data;
}
export const createAboutBlock = async (formData) => {
    const updatedData = await $authHost.post('api/about/block', formData);
    return updatedData.data;
}
export const updateAboutBlockData = async (id, dbFieldName, data) => {
    const updatedData = await $authHost.put('api/about/block' , {id, [dbFieldName]: data});
    return updatedData.data;
}
export const updateAboutBlockImg = async (formData) => {
    const { data } = await $authHost.patch('api/about/block/img-update/' , formData);
    return data; 
}
export const deleteBlockReq = async (id) => {
    const updatedData = await $authHost.delete('api/about/block' , {
        data: {id}
      });
    return updatedData.data;
}

export const createAboutBtn = async ({text, link}) => {
    const updatedData = await $authHost.post('api/about/btn', {text, link});
    return updatedData.data;
}
export const fetchAboutBtns = async () => {
    const updatedData = await $authHost.get('api/about/btns');
    return updatedData.data;
}
export const updateAboutBtnData = async (id, dbFieldName, data) => {
    const updatedData = await $authHost.put('api/about/btn' , {id, [dbFieldName]: data});
    return updatedData.data;
}
export const deleteBtnReq = async (id) => {
    const updatedData = await $authHost.delete('api/about/btn' , {
        data: {id}
      });
    return updatedData.data;
}


