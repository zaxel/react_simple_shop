import { fetchAllDevices as getDevices, updateDevice, deleteDeviceReq, fetchTypes } from "../http/deviceAPI";

export const fetchAllDevices = async(currentStore, sortBy, sortDirection, limit, page, searchBy, searchPrase) => {
  const  [brandId, typeId, id, startPage, defaultLimit] = [null, null, null, null, null]; 
  // brandId, typeId, limit, page, id, startPage, defaultLimit, sortBy, sortDirection = 'ASC', searchBy, searchPrase
  
  const fetchedServerDevices = await getDevices( brandId, typeId, limit, page, id, startPage, defaultLimit, sortBy, sortDirection = 'ASC', searchBy, searchPrase); 
    if(fetchedServerDevices.count === 0) alert('Nothing found!')
    await currentStore.setDevices(fetchedServerDevices);
}

export const changeDeviceData = async(id, dbFieldName, data) => {
 
  const updated = await updateDevice(id, dbFieldName, data); 
    return updated;
}
export const deleteDevice = async(id) => {
  console.log('delete device admin device')  
  return {}
  // const deleted = await deleteDeviceReq(id); 
    // return deleted;
}

export const fetchPage = async(adminDevicesStore) => {
  try {
        adminDevicesStore.setLoading(true);
      await fetchAllDevices(adminDevicesStore, adminDevicesStore.sortBy, adminDevicesStore.sortDirection, adminDevicesStore.itemsPerPage, adminDevicesStore.activePage, adminDevicesStore.searchBy, adminDevicesStore.searchByPrase);
      adminDevicesStore.setPagesTotal(Math.ceil(adminDevicesStore.devices.count / adminDevicesStore.itemsPerPage));
    } catch (e) {
      console.log(e)
    } finally {
        adminDevicesStore.setLoading(false);
    }
  }
export const fetchSetTypes = async(adminDevicesStore) => {
  try {
      const types = await fetchTypes();
      const data = await adminDevicesStore.setTypes(types);
      return types;
    } catch (e) {
      console.log(e)
    } 
  }