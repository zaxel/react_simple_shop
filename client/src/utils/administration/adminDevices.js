import { fetchAllDevices, updateDevice, updateImg,
        deleteDeviceReq, createBulkDevices as createBulkDevicesReq,
        createDevice as createDeviceReq, fetchAllTypes, fetchAllBrands, 
        deleteDeviceImgReq,
        addDeviceImgReq,
        updateDeviceImgReq} from "../../http/deviceAPI";
import { fetchAll, fetchDataSetStore } from "./common";


export const createDevice = async (formData, cartStore, userStore, flags = { loadingOn: false, loadingOff: false, setToStore: false, setPageTotal: false, checkIfAuth: true }) => {
  const cb = createDeviceReq.bind(this, formData);
  return fetchDataSetStore(cb, null, cartStore, userStore, flags);
} 

export const createBulkDevices = async (formData, cartStore, userStore, signal, flags = { loadingOn: false, loadingOff: false, setToStore: false, setPageTotal: false, checkIfAuth: true }) => {
  const cb = createBulkDevicesReq.bind(this, formData, signal);  
  return await fetchDataSetStore(cb, null, cartStore, userStore, flags); 

}
export const changeDeviceData = async (id, dbFieldName, data, cartStore, userStore, curStore=null,
  flags={ loadingOn: false, loadingOff: false, setToStore: false, setPageTotal: false, checkIfAuth: true }) => {
  // const flags = { loadingOn: false, loadingOff: false, setToStore: false, setPageTotal: false, checkIfAuth: true };
  const cb = updateDevice.bind(this, id, dbFieldName, data); 
  return fetchDataSetStore(cb, curStore, cartStore, userStore, flags);
}

export const deleteDevice = async (id, cartStore, userStore) => {
  const flags = { loadingOn: false, loadingOff: false, setToStore: false, setPageTotal: false, checkIfAuth: true };
  const cb = deleteDeviceReq.bind(this, id);
  return fetchDataSetStore(cb, null, cartStore, userStore, flags);
}

export const addDeviceImg = async (data, cartStore, userStore, flags = { loadingOn: false, loadingOff: false, setToStore: false, setPageTotal: false, checkIfAuth: true }) => {
  const cb = addDeviceImgReq.bind(this, data); 
  return fetchDataSetStore(cb, null, cartStore, userStore, flags);  
}
export const updateDeviceImg = async (data, cartStore, userStore, flags = { loadingOn: false, loadingOff: false, setToStore: false, setPageTotal: false, checkIfAuth: true }) => {
  const cb = updateDeviceImgReq.bind(this, data); 
  return fetchDataSetStore(cb, null, cartStore, userStore, flags);  
}
export const deleteDeviceImg = async (data, cartStore, userStore, flags = { loadingOn: false, loadingOff: false, setToStore: false, setPageTotal: false, checkIfAuth: true }) => {
  const cb = deleteDeviceImgReq.bind(this, data);
  return fetchDataSetStore(cb, null, cartStore, userStore, flags);  
}

export const fetchPage = async (currentStore) => {
  const flags = { loadingOn: true, loadingOff: true, setToStore: true, setPageTotal: true, checkIfAuth: false };
  const cb = fetchAll.bind(this, fetchAllDevices, null, currentStore.sortBy, currentStore.sortDirection, currentStore.itemsPerPage, currentStore.activePage, currentStore.searchBy, currentStore.searchByPrase, currentStore.brandActive, currentStore.typeActive);
  return fetchDataSetStore(cb, currentStore, null, null, flags); 
}

export const fetchSetTypes = async (adminDevicesStore) => {
  const flags = { loadingOn: false, loadingOff: false, setToStore: false, setPageTotal: false, checkIfAuth: false };
  const cb = fetchAll.bind(this, fetchAllTypes);
  const types = await fetchDataSetStore(cb, adminDevicesStore, null, null, flags);
  await adminDevicesStore.setTypes(types);
}

export const fetchSetBrands = async (adminDevicesStore) => {
  const flags = { loadingOn: false, loadingOff: false, setToStore: false, setPageTotal: false, checkIfAuth: false };
  const cb = fetchAll.bind(this, fetchAllBrands);
  const brands = await fetchDataSetStore(cb, adminDevicesStore, null, null, flags);
  await adminDevicesStore.setBrands(brands);
}


