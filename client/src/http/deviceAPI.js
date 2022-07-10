import {$host, $authHost} from ".";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/type', {type});
    return data;
}
export const fetchTypes = async () => {
    const {data} = await $host.get('api/type');
    return data;
}
export const createBrand = async (brand) => {
    const {data} = await $authHost.post('api/brand', {brand});
    return data;
}
export const fetchBrands = async () => {
    const {data} = await $host.get('api/brand');
    return data;
}
export const createDevice = async (formData) => {
    const {data} = await $authHost.post('api/device', formData);
    return data;
}
export const createBulkDevices = async (formData) => {
    const {data} = await $authHost.post('api/device/bulk', formData);
    return data;
}

export const fetchAllDevices = async (brandId, typeId, limit, page, id, startPage = null, defaultLimit = null, sortBy, sortDirection = 'ASC', searchBy = null, searchPrase = null) => {
    const {data} = await $host.get('api/device', {params:{
        brandId, typeId, limit, page, id, startPage, defaultLimit, sortBy, sortDirection, searchBy, searchPrase
    }}); 
    return data;
}

export const fetchSingleDevice = async (id) => {
    const {data} = await $host.get(`api/device/${id}`);
    return data;
}
export const fetchRandomDevices = async (amount) => {
    const {data} = await $host.get('api/device/random', {params:{amount}});
    return data;
}
export const updateDevice = async (id, dbFieldName, data) => {
    console.log(id, dbFieldName, data)
    const updatedData = await $authHost.put('api/device/' , {id, [dbFieldName]: data});
    return updatedData.data; 
}
