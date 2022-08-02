import {$host, $authHost} from ".";

export const createTypes = async (types) => {
    const {data} = await $authHost.post('api/type', {types});
    return data;
}
export const fetchAllTypes = async (sortBy, sortDirection = 'ASC') => {
    const {data} = await $host.get('api/type', {params:{
        sortBy, sortDirection
    }}); 
    return data;
}
export const updateType = async (id, name) => {
    const updatedData = await $authHost.put('api/type' , {id, name});
    return updatedData.data; 
}
export const deleteTypeReq = async (id) => {
    const deletedData = await $authHost.delete('api/type' , {
        data: {id}
      });
    return deletedData.data;
}


export const createBrands = async (brands) => {
    const {data} = await $authHost.post('api/brand', {brands});
    return data;
}
export const fetchAllBrands = async (sortBy = 'id', sortDirection = 'ASC') => {
    const {data} = await $host.get('api/brand', {params:{
        sortBy, sortDirection
    }}); 
    return data;
}
export const updateBrand = async (id, name) => {
    const updatedData = await $authHost.put('api/brand' , {id, name});
    return updatedData.data; 
}
export const deleteBrandReq = async (id) => {
    const deletedData = await $authHost.delete('api/brand' , {
        data: {id}
      });
    return deletedData.data;
}



export const createDevice = async (formData) => {
    const {data} = await $authHost.post('api/device', formData);
    return data;
}
export const createBulkDevices = async (formData) => {
    const {data} = await $authHost.post('api/device/bulk', formData);
    return data;
}

export const fetchAllDevices = async (sortBy, sortDirection = 'ASC', page, searchBy = null, searchPrase = null, limit, id, brandId, typeId) => {
    const {data} = await $host.get('api/device', {params:{
        brandId, typeId, limit, page, id, sortBy, sortDirection, searchBy, searchPrase
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
    const updatedData = await $authHost.put('api/device/' , {id, [dbFieldName]: data});
    return updatedData.data; 
}
export const updateImg = async (formData) => {
    const updatedData = await $authHost.patch('api/device/img-update/' , formData);
    return updatedData.data; 
}
export const deleteDeviceReq = async (id) => {
    const deletedData = await $authHost.delete('api/device/' , {
        data: {id}
      });
    return deletedData.data;
}
