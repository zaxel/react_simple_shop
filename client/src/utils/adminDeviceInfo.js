import { fetchDeviceInfo, updateDeviceInfo, deleteDeviceInfoLineReq } from "../http/deviceInfoAPI";

export const fetchAllInfo = async (currentStore, deviceId, sortBy, sortDirection) => {
  const fetchedDeviceInfo = await fetchDeviceInfo(deviceId, sortBy, sortDirection);
  if (fetchedDeviceInfo.count === 0) console.log('Nothing found!')
  await currentStore.setInfo(fetchedDeviceInfo);
}

export const fetchInfo = async (currentStore, deviceId, sortBy, sortDirection) => {
  try {
    currentStore.setLoading(true);
    await fetchAllInfo(currentStore, deviceId, sortBy = null, sortDirection = null);
  } catch (e) {
    console.log(e)
  } finally {
    currentStore.setLoading(false);
  }
}

export const changeDeviceInfoData = async (deviceId, dbFieldName, data) => {
  try{
    const updated = await updateDeviceInfo(deviceId, dbFieldName, data);
    return updated;
  }catch(e){
    console.log(e);
  }
}

export const deleteDeviceInfoLine = async (lineId) => {
  try{
    const deleted = await deleteDeviceInfoLineReq(lineId); 
    return deleted;
  }catch(e){
    console.log(e);
  }
}