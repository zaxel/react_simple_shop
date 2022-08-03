import {$host, $authHost} from ".";

export const fetchDeviceInfo = async (deviceId, sortBy, sortDirection) => {
    const {data} = await $host.get(`api/device/info/${deviceId}`, {params:{
        sortBy, sortDirection
    }}); 
    return data;
}
export const updateDeviceInfo = async (id, dbFieldName, data) => {
    const updated = await $authHost.put('api/device/info' , {id, [dbFieldName]: data});
    return updated.data; 
    
}
export const createDeviceInfos = async (newInfos) => {
    const {data} = await $authHost.post('api/device/info', newInfos);
    return data;
}
export const deleteDeviceInfoLine = async (id) => {
    const deleted = await $authHost.delete('api/device/info' , {
        data: {id}
      });
    return deleted.data;
}