import { fetchDeviceInfo, updateDeviceInfo, createDeviceInfos as createDeviceInfosReq, 
        deleteDeviceInfoLine as deleteDeviceInfoLineReq } from "../../http/deviceInfoAPI";
import { fetchAll, fetchDataSetStore } from "./common";


export const fetchInfo = async (currentStore, deviceId, sortBy, sortDirection, cartStore, userStore) => {
  const flags = { loadingOn: true, loadingOff: true, setToStore: false, setPageTotal: false, checkIfAuth: true };
  const cb = fetchAll.bind(this, fetchDeviceInfo, deviceId, sortBy, sortDirection);
  return fetchDataSetStore(cb, currentStore, cartStore, userStore, flags);
}

export const createDeviceInfos = async (currentStore, newRows, cartStore, userStore) => {
  const flags = { loadingOn: true, loadingOff: true, setToStore: false, setPageTotal: false, checkIfAuth: true };
  const cb = createDeviceInfosReq.bind(this, newRows);
  return fetchDataSetStore(cb, currentStore, cartStore, userStore, flags);
}

export const changeDeviceInfo = async (infoId, dbFieldName, data, cartStore, userStore) => {
  const flags = { loadingOn: false, loadingOff: false, setToStore: false, setPageTotal: false, checkIfAuth: true };
  const cb = updateDeviceInfo.bind(this, infoId, dbFieldName, data);
  return fetchDataSetStore(cb, null, cartStore, userStore, flags);
}

export const deleteDeviceInfoLine = async (lineId, cartStore, userStore) => {
  const flags = { loadingOn: false, loadingOff: false, setToStore: false, setPageTotal: false, checkIfAuth: true };
  const cb = deleteDeviceInfoLineReq.bind(this, lineId);
  return fetchDataSetStore(cb, null, cartStore, userStore, flags);
}
