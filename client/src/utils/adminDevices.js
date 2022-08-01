import { fetchAllDevices as getDevices, updateDevice, deleteDeviceReq, fetchTypes } from "../http/deviceAPI";
import { fetchAllBrands } from "./adminBrands";

export const fetchAllDevices = async (currentStore, sortBy, sortDirection, limit, page, searchBy, searchPrase) => {
  const [brandId, typeId, id, startPage, defaultLimit] = [null, null, null, null, null];
  const fetchedServerDevices = await getDevices(brandId, typeId, limit, page, id, startPage, defaultLimit, sortBy, sortDirection, searchBy, searchPrase);
  if (fetchedServerDevices.count === 0) alert('Nothing found!')
  await currentStore.setDevices(fetchedServerDevices);
}

export const changeDeviceData = async (id, dbFieldName, data) => {
  const updated = await updateDevice(id, dbFieldName, data);
  return updated;
}
export const deleteDevice = async (id) => {
  const deleted = await deleteDeviceReq(id);
  return deleted;
}

export const fetchPage = async (adminDevicesStore) => {
  try {
    adminDevicesStore.setLoading(true);
    await fetchAllDevices(adminDevicesStore, adminDevicesStore.sortBy, adminDevicesStore.sortDirection, adminDevicesStore.itemsPerPage, adminDevicesStore.activePage, adminDevicesStore.searchBy, adminDevicesStore.searchByPrase);
    adminDevicesStore.setPagesTotal(Math.ceil(adminDevicesStore.devices.count / adminDevicesStore.itemsPerPage));
  } catch (e) {
    console.log(e);
    alert(e.response.data.message);
  } finally {
    adminDevicesStore.setLoading(false);
  }
}
export const fetchSetTypes = async (adminDevicesStore) => {
  try {
    const types = await fetchTypes();
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

