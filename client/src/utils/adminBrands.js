import { fetchAllBrands as getBrands, updateBrand, deleteBrandReq, createBrands } from "../http/deviceAPI";
import { logoutOnClient } from "./logout";

export const fetchAllBrands = async (currentStore, sortBy, sortDirection) => {
  const fetchedServerBrands = await getBrands(sortBy, sortDirection);
  if (fetchedServerBrands.count === 0) alert('Nothing found!')
  await currentStore.setBrands(fetchedServerBrands);
}

export const changeBrandData = async (id, name, cartStore, userStore) => {
  try {
    const updated = await updateBrand(id, name);
    return updated;
  } catch (e) {
    if (e.response.status === 401) {
      logoutOnClient(cartStore, userStore);
      alert('Session timed out. You have to login again to continue."');
    }
    throw e;
  }
}
export const deleteBrand = async (id, cartStore, userStore) => {
  try {
    const deleted = await deleteBrandReq(id);
  return deleted;
  } catch (e) {
    if (e.response.status === 401) {
      logoutOnClient(cartStore, userStore);
      alert('Session timed out. You have to login again to continue."');
    }
    throw e;
  }
}

export const fetchPage = async (adminBrandsStore) => {
  try {
    adminBrandsStore.setLoading(true);
    await fetchAllBrands(adminBrandsStore, adminBrandsStore.sortBy, adminBrandsStore.sortDirection);
  } catch (e) {
    console.log(e);
    alert(e.response.data.message);
  } finally {
    adminBrandsStore.setLoading(false);
  }
}
export const addNewBrands = async (brands, cartStore, userStore) => {
  try {
    const data = await createBrands(brands);
    return data;
  } catch (e) {
    if (e.response.status === 401) {
      logoutOnClient(cartStore, userStore);
      alert('Session timed out. You have to login again to continue."');
    }
    throw e;
  }
}
