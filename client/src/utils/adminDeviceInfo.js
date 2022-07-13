import { fetchDeviceInfo, updateDeviceInfo, deleteDeviceInfoLineReq } from "../http/deviceInfoAPI";

export const fetchAllInfo = async (currentStore, deviceId, sortBy, sortDirection) => {
  const fetchedDeviceInfo = await fetchDeviceInfo(deviceId, sortBy, sortDirection = 'ASC');
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
  const updated = await updateDeviceInfo(deviceId, dbFieldName, data);
  return updated;
}
export const deleteDeviceInfoLine = async (lineId) => {
  const deleted = await deleteDeviceInfoLineReq(lineId); 
  return deleted;
}