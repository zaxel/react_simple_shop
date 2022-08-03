import { fetchAllBrands as getBrands, updateBrand, deleteBrandReq, createBrands } from "../http/deviceAPI";
import { logoutOnClient } from "./logout";

export const fetchAllBrands = async (sortBy, sortDirection) => {
  const fetchedServerBrands = await getBrands(sortBy, sortDirection);
  if (fetchedServerBrands.count === 0) alert('Nothing found!')
  return fetchedServerBrands;
}
export const setBrandsToStore = async (store, brands) => {
  await store.setBrands(brands); 
}

export const changeBrandData = async (id, name, cartStore, userStore) => {
  try {
    const updated = await updateBrand(id, name);
    return updated;
  } catch (e) {
    if (e.response.status === 401 && userStore.isAuth) {
      alert('Session timed out. You have to login again to continue. (adminBrands 1)');
      return logoutOnClient(cartStore, userStore);
    }
    throw e;
  }
}
export const deleteBrand = async (id, cartStore, userStore) => {
  try {
    const deleted = await deleteBrandReq(id);
  return deleted;
  } catch (e) {
    if (e.response.status === 401 && userStore.isAuth) {
      alert('Session timed out. You have to login again to continue. (adminBrands 2)');
      return logoutOnClient(cartStore, userStore);
    }
    throw e;
  }
}

export const fetchPage = async (currentStore) => {
  try {
    currentStore.setLoading(true);
    const data = await fetchAllBrands(currentStore.sortBy, currentStore.sortDirection);
    setBrandsToStore(currentStore, data);
  } catch (e) {
    console.log(e);
    alert(e.response.data.message);
  } finally {
    currentStore.setLoading(false);
  }
}
export const addNewBrands = async (brands, cartStore, userStore) => {
  try {
    const data = await createBrands(brands);
    return data;
  } catch (e) {
    if (e.response.status === 401 && userStore.isAuth) {
      alert('Session timed out. You have to login again to continue. (adminBrands 3)');
      return logoutOnClient(cartStore, userStore);
    }
    throw e;
  }
}
