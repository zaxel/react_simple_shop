import { fetchAllTypes, updateType, deleteTypeReq, createTypes } from "../../http/deviceAPI";
import { fetchAll, fetchDataSetStore } from "./common";

export const changeTypeData = async (id, dbFieldName, name, cartStore, userStore) => {
  const flags = { loadingOn: false, loadingOff: false, setToStore: false, setPageTotal: false, checkIfAuth: true };
  const cb = updateType.bind(this, id, name);
  return fetchDataSetStore(cb, null, cartStore, userStore, flags);
}

export const deleteType = async (id, currentStore, cartStore, userStore) => {
  const flags = { loadingOn: false, loadingOff: false, setToStore: false, setPageTotal: false, checkIfAuth: true };
  const cb = deleteTypeReq.bind(this, id);
  return fetchDataSetStore(cb, null, cartStore, userStore, flags);
}

export const fetchPage = async (adminTypesStore) => {
  const flags = { loadingOn: true, loadingOff: true, setToStore: true, setPageTotal: false, checkIfAuth: false };
  const cb = fetchAll.bind(this, fetchAllTypes, null, adminTypesStore.sortBy, adminTypesStore.sortDirection);
  return fetchDataSetStore(cb, adminTypesStore, null, null, flags);
}

export const addNewTypes = async (types, cartStore, userStore) => {
  const flags = { loadingOn: false, loadingOff: false, setToStore: false, setPageTotal: false, checkIfAuth: true };
  const cb = createTypes.bind(this, types);
  return fetchDataSetStore(cb, null, cartStore, userStore, flags);
}
