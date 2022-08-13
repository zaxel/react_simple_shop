import { fetchAllDevices, updateDevice, updateImg,
        deleteDeviceReq, createBulkDevices as createBulkDevicesReq,
        createDevice as createDeviceReq, fetchAllTypes, fetchAllBrands } from "../../http/deviceAPI";
import { fetchAll, fetchDataSetStore } from "./common";


export const createDevice = async (formData, cartStore, userStore) => {
  const flags = { loadingOn: false, loadingOff: false, setToStore: false, setPageTotal: false, checkIfAuth: true };
  const cb = createDeviceReq.bind(this, formData);
  return fetchDataSetStore(cb, null, cartStore, userStore, flags);
}

export const createBulkDevices = async (formData, cartStore, userStore) => {
  const flags = { loadingOn: false, loadingOff: false, setToStore: false, setPageTotal: false, checkIfAuth: true };
  const cb = createBulkDevicesReq.bind(this, formData);
  return fetchDataSetStore(cb, null, cartStore, userStore, flags);

}
export const changeDeviceData = async (id, dbFieldName, data, cartStore, userStore) => {
  const flags = { loadingOn: false, loadingOff: false, setToStore: false, setPageTotal: false, checkIfAuth: true };
  const cb = updateDevice.bind(this, id, dbFieldName, data);
  return fetchDataSetStore(cb, null, cartStore, userStore, flags);
}

export const deleteDevice = async (id, cartStore, userStore) => {
  const flags = { loadingOn: false, loadingOff: false, setToStore: false, setPageTotal: false, checkIfAuth: true };
  const cb = deleteDeviceReq.bind(this, id);
  return fetchDataSetStore(cb, null, cartStore, userStore, flags);
}

export const updateDeviceImg = async (data, cartStore, userStore) => {
  const flags = { loadingOn: false, loadingOff: false, setToStore: false, setPageTotal: false, checkIfAuth: true };
  const cb = updateImg.bind(this, data);
  return fetchDataSetStore(cb, null, cartStore, userStore, flags);  
  
  // try {
  //   const updated = await updateImg(data);
  //   return updated;
  // } catch (e) {
  //   if (e.response.status === 401 && userStore.isAuth) {
  //     alert('Session timed out. You have to login again to continue. (adminTypes 35)');
  //     return logoutOnClient(cartStore, userStore);
  //   }else{
  //     throw e;
  //   }
  // }
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


