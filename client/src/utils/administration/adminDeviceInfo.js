import { fetchDeviceInfo, updateDeviceInfo, createDeviceInfos as createDeviceInfosReq, 
        deleteDeviceInfoLine as deleteDeviceInfoLineReq } from "../../http/deviceInfoAPI";
import { logoutOnClient } from "../logout";
import { fetchAll } from "./common";


export const fetchInfo = async (currentStore, deviceId, sortBy, sortDirection, cartStore, userStore) => {
  try {
    currentStore.setLoading(true);
    const data = await fetchAll(fetchDeviceInfo, deviceId, sortBy, sortDirection);
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


export const changeDeviceInfo = async (infoId, dbFieldName, data, cartStore, userStore) => {
  try {
    const updated = await updateDeviceInfo(infoId, dbFieldName, data);
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
