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
export const fetchAllDevices = async (brandId, typeId, limit, page, id) => {
    const {data} = await $host.get('api/device', {params:{
        brandId, 
        typeId, 
        limit, 
        page,
        id
    }});
    return data;
}
export const fetchSingleDevice = async (id) => {
    const {data} = await $host.get(`api/device/${id}`);
    return data;
}