import {$host, $authHost} from ".";

export const fetchDeviceInfo = async (deviceId, sortBy, sortDirection) => {
    const {data} = await $host.get(`api/device/info/${deviceId}`, {params:{
        sortBy, sortDirection
    }}); 
    return data;
}

export const updateDeviceInfo = async (id, dbFieldName, data) => {
    try{
        const updatedData = await $authHost.put('api/device/info' , {id, [dbFieldName]: data});
        return updatedData.data; 
    }catch(e){
        console.log(e)
    }
    
}

export const createDeviceInfos = async (newInfos) => {
    try{
        const {data} = await $authHost.post('api/device/info', newInfos);
        return data;
    }catch(e){
        console.log(e);
    }

    
}