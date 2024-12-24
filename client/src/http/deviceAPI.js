import {$host, $authHost} from ".";
import { formDataNewDeviceOuterImgStore } from "../utils/formsServing/deivceServing";
import { fetchImageAsBlob } from "../utils/formsServing/imgServing";

export const createTypes = async (types) => {
    const {data} = await $authHost.post('api/type', {types});
    return data;
}
export const fetchAllTypes = async (id, sortBy, sortDirection = 'ASC') => {
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
export const fetchAllBrands = async (id, sortBy = 'id', sortDirection = 'ASC') => {
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
export const createBulkDevices = async (requests, signal) => {
    const imagesFolder =  process.env.REACT_APP_IMAGES_FOLDER || "http://localhost:3000/bulkUploadImgs/";
    const itemsBatch = await Promise.all(requests.map(async({images, ...rest})=>{
        const imagesBlobs = await Promise.all(images.map(async img=>{
            return {id: img, img: await fetchImageAsBlob(imagesFolder+img)};  
        })); 
        const itemFormData = formDataNewDeviceOuterImgStore(rest.name, rest.price, rest.brandId, rest.typeId, rest.info, imagesBlobs, rest.seller_dscr);   
        return itemFormData;
    }))
    const sendBatch = async (batch, signal) => {
        const requests = batch.map(async (item) => {
            return await $authHost.post('api/device/bulk', item, {signal}); 
          });
          return await Promise.allSettled(requests);   
      };
      return await sendBatch(itemsBatch, signal);
}

export const fetchAllDevices = async (id, sortBy, sortDirection = 'ASC', limit, page, searchBy = null, searchPrase = null, brandId, typeId) => {
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
export const updateDevice = async (id, dbFieldName, newData) => {
    const { data } = await $authHost.put('api/device/' , {id, [dbFieldName]: newData});
    return data; 
}



export const addDeviceImgReq = async (formData) => {
    const { data } = await $authHost.patch('api/device/img-create/' , formData);  
    return data; 
}
export const updateDeviceImgReq = async (formData) => { 
    const { data } = await $authHost.put('api/device/img-update/' , formData); 
    return data; 
}
export const deleteDeviceImgReq = async (imageData) => { 
    const { data } = await $authHost.delete('api/device/img-delete/' , {
        data: imageData
      });
    return data; 
}
export const deleteDeviceReq = async (id) => {
    const deletedData = await $authHost.delete('api/device/' , {
        data: {id}
      });
    return deletedData.data;
}
