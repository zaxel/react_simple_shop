import { fetchDeviceInfo, updateDeviceInfo, createDeviceInfos as createDeviceInfosReq, 
        deleteDeviceInfoLine as deleteDeviceInfoLineReq } from "../http/deviceInfoAPI";
import { logoutOnClient } from "./logout";

export const fetchAllInfo = async (deviceId, sortBy, sortDirection) => {
  const fetchedDeviceInfo = await fetchDeviceInfo(deviceId, sortBy, sortDirection);
  if (fetchedDeviceInfo.count === 0) console.log(fetchedDeviceInfo, 'Nothing found!')
  return fetchedDeviceInfo;
}
export const setInfoToStore = async (store, info) => {
  await store.setInfo(info); 
}

export const fetchInfo = async (currentStore, deviceId, sortBy, sortDirection, cartStore, userStore) => {
  try {
    currentStore.setLoading(true);
    const data = await fetchAllInfo(deviceId, sortBy, sortDirection);
    return data;
  }catch (e) {
    if (e.response.status === 401 && userStore.isAuth) {
      alert('Session timed out. You have to login again to continue. (adminDeviceInfo 40)');
      return logoutOnClient(cartStore, userStore);
    }
    throw e;
  }finally {
    currentStore.setLoading(false);
  }
}
export const createDeviceInfos = async (currentStore, newRows, cartStore, userStore) => {
  try {
    currentStore.setLoading(true);
    const data = await createDeviceInfosReq(newRows);
    return data;
  }catch (e) {
    if (e.response.status === 401 && userStore.isAuth) {
      alert('Session timed out. You have to login again to continue. (adminDeviceInfo 41)');
      return logoutOnClient(cartStore, userStore);
    }
    throw e;
  }finally {
    currentStore.setLoading(false);
  }
}


export const changeDeviceInfo = async (deviceId, dbFieldName, data, cartStore, userStore) => {
  try {
    const updated = await updateDeviceInfo(deviceId, dbFieldName, data);
    return updated;
  }catch (e) {
    if (e.response.status === 401 && userStore.isAuth) {
      alert('Session timed out. You have to login again to continue. (adminDeviceInfo 44)');
      return logoutOnClient(cartStore, userStore);
    }
    throw e;
  }
}

export const deleteDeviceInfoLine = async (lineId, cartStore, userStore) => {
  try {
    const data = await deleteDeviceInfoLineReq(lineId);
    return data;
  }catch (e) {
    if (e.response.status === 401 && userStore.isAuth) {
      alert('Session timed out. You have to login again to continue. (adminDeviceInfo 45)');
      return logoutOnClient(cartStore, userStore);
    }
    throw e;
  }
}
