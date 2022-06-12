import { getDevices, updateDevice, deleteDeviceReq } from "../http/deviceAPI";

export const fetchAllDevices = async(currentStore, sortBy, sortDirection, limit, page, searchBy, searchPrase) => {
  console.log('fetch all devices admin device')  
  return {}
  // const fetchedServerDevices = await getDevices( sortBy, sortDirection, limit, page, searchBy, searchPrase); //sortBy, sortDirection, limit, page, searchBy, searchPrase
    // if(fetchedServerDevices.count === 0) alert('Nothing found!')
    // await currentStore.setDevices(fetchedServerDevices);
}

export const changeDeviceData = async(id, dbFieldName, data) => {
  console.log('change device data admin device')  
  return {}
  // const updated = await updateDevice(id, dbFieldName, data); 
    // return updated;
}
export const deleteDevice = async(id) => {
  console.log('delete device admin device')  
  return {}
  // const deleted = await deleteDeviceReq(id); 
    // return deleted;
}

export const fetchPage = async(adminDevicesStore) => {
  console.log('fetchPage admin device')  
  return {}
  // try {
    //     adminDevicesStore.setLoading(true);
    //   await fetchAllDevices(adminDevicesStore, adminDevicesStore.sortBy, adminDevicesStore.sortDirection, adminDevicesStore.itemsPerPage, adminDevicesStore.activePage, adminDevicesStore.searchBy, adminDevicesStore.searchByPrase);
    //   adminDevicesStore.setPagesTotal(Math.ceil(adminDevicesStore.adminDevices.count / adminDevicesStore.itemsPerPage));
    // } catch (e) {
    //   console.log(e)
    // } finally {
    //     adminDevicesStore.setLoading(false);
    // }
  }