import { fetchAllBrands, updateBrand, deleteBrandReq, createBrands } from "../../http/deviceAPI";
import { fetchAll, fetchDataSetStore } from "./common";

export const changeBrandData = async (id, dbFieldName, name, cartStore, userStore) => {
  const flags = { loadingOn: false, loadingOff: false, setToStore: false, setPageTotal: false, checkIfAuth: true };
  const cb = updateBrand.bind(this, id, name);
  return fetchDataSetStore(cb, null, cartStore, userStore, flags);
}

export const deleteBrand = async (id, cartStore, userStore) => {
  const flags = { loadingOn: false, loadingOff: false, setToStore: false, setPageTotal: false, checkIfAuth: true };
  const cb = deleteBrandReq.bind(this, id);
  return fetchDataSetStore(cb, null, cartStore, userStore, flags);
}

export const fetchPage = async (currentStore) => {
  const flags = { loadingOn: true, loadingOff: true, setToStore: true, setPageTotal: false, checkIfAuth: false };
  const cb = fetchAll.bind(this, fetchAllBrands, null, currentStore.sortBy, currentStore.sortDirection);
  return fetchDataSetStore(cb, currentStore, null, null, flags);
}

export const addNewBrands = async (brands, cartStore, userStore) => {
  const flags = { loadingOn: false, loadingOff: false, setToStore: false, setPageTotal: false, checkIfAuth: true };
  const cb = createBrands.bind(this, brands);
  return fetchDataSetStore(cb, null, cartStore, userStore, flags);
}
