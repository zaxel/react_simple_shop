import { fetchAllDevices as getDevices, updateDevice, deleteDeviceReq, createBulkDevices as createBulkDevicesReq } from "../http/deviceAPI";
import { fetchAllBrands } from "./adminBrands";
import { fetchAllTypes } from "./adminTypes";
import { logoutOnClient } from "./logout";
import { updateImg } from "../http/deviceAPI";

export const fetchAllDevices = async (sortBy, sortDirection, page, searchBy, searchPrase, limit, id, brandId, typeId) => {
  const fetchedServerDevices = await getDevices(sortBy, sortDirection, page, searchBy, searchPrase, limit, id, brandId, typeId);
  if (fetchedServerDevices.count === 0) alert('Nothing found!')
  return fetchedServerDevices;
}
export const setDevicesToStore = async (store, devices) => {
  await store.setDevices(devices);
}

export const createBulkDevices = async (formData, cartStore, userStore) => {
  try {
    const updated = await createBulkDevicesReq(formData);
    return updated;
  } catch (e) {
    if (e.response.status === 401 && userStore.isAuth) {
      alert('Session timed out. You have to login again to continue. (adminTypes 31)');
      return logoutOnClient(cartStore, userStore);
    }else{
      throw e;
    }
  }
}
export const changeDeviceData = async (id, dbFieldName, data, cartStore, userStore) => {
  try {
    const updated = await updateDevice(id, dbFieldName, data);
    return updated;
  } catch (e) {
    if (e.response.status === 401 && userStore.isAuth) {
      alert('Session timed out. You have to login again to continue. (adminTypes 32)');
      return logoutOnClient(cartStore, userStore);
    }else{
      throw e;
    }
  }
}
export const deleteDevice = async (id, cartStore, userStore) => {
  try {
    const updated = await deleteDeviceReq(id);
    return updated;
  } catch (e) {
    if (e.response.status === 401 && userStore.isAuth) {
      alert('Session timed out. You have to login again to continue. (adminTypes 33)');
      return logoutOnClient(cartStore, userStore);
    }else{
      throw e;
    }
  }
}
export const updateDeviceImg = async (data, cartStore, userStore) => {
  try {
    const updated = await updateImg(data);
    return updated;
  } catch (e) {
    if (e.response.status === 401 && userStore.isAuth) {
      alert('Session timed out. You have to login again to continue. (adminTypes 34)');
      return logoutOnClient(cartStore, userStore);
    }else{
      throw e;
    }
  }
}

export const fetchPage = async (currentStore) => {
  try {
    currentStore.setLoading(true);
    const data = await fetchAllDevices(currentStore.sortBy, currentStore.sortDirection, currentStore.activePage, currentStore.searchBy, currentStore.searchByPrase, currentStore.itemsPerPage, null, currentStore.brandActive, currentStore.typeActive);
    currentStore.setPagesTotal(Math.ceil(currentStore.devices.count / currentStore.itemsPerPage));
    setDevicesToStore(currentStore, data);
  } catch (e) {
    console.log(e);
    alert(e.response.data.message);
  } finally {
    currentStore.setLoading(false);
  }
}
export const fetchSetTypes = async (adminDevicesStore) => {
  try {
    const types = await fetchAllTypes();
    const data = await adminDevicesStore.setTypes(types);
    return types;
  } catch (e) {
    console.log(e)
  }
}
export const fetchSetBrands = async (adminDevicesStore) => {
  try {
    const brands = await fetchAllBrands();
    const data = await adminDevicesStore.setBrands(brands);
    return brands;
  } catch (e) {
    console.log(e)
  }
}


