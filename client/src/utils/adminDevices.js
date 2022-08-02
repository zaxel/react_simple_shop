import { fetchAllDevices as getDevices, updateDevice, deleteDeviceReq } from "../http/deviceAPI";
import { fetchAllBrands } from "./adminBrands";
import { fetchAllTypes } from "./adminTypes";

export const fetchAllDevices = async (sortBy, sortDirection, page, searchBy, searchPrase, limit, id, brandId, typeId) => {
  const fetchedServerDevices = await getDevices(sortBy, sortDirection, page, searchBy, searchPrase, limit, id, brandId, typeId);
  if (fetchedServerDevices.count === 0) alert('Nothing found!')
  return fetchedServerDevices;
}
export const setDevicesToStore = async (store, devices) => {
  await store.setDevices(devices); 
}

export const changeDeviceData = async (id, dbFieldName, data) => {
  const updated = await updateDevice(id, dbFieldName, data);
  return updated;
}
export const deleteDevice = async (id) => {
  const deleted = await deleteDeviceReq(id);
  return deleted;
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
export const changeDeviceInfoData = async (deviceId, dbFieldName, data) => {
  try {
    const updated = await updateDevice(deviceId, dbFieldName, data);
    return updated;
  } catch (e) {
    console.log(e);
  }

}

