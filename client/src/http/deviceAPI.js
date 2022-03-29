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
export const createDevice = async (name, price, brandId, typeId, info) => {
    const {data} = await $authHost.post('api/device', {name, price, brandId, typeId, info});
    return data;
}
export const fetchAllDevices = async () => {
    const {data} = await $host.get('api/device');
    return data;
}
export const fetchSingleDevice = async (id) => {
    const {data} = await $host.get(`api/device/${id}`);
    return data;
}