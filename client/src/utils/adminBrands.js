import { fetchAllBrands as getBrands, updateBrand, deleteBrandReq } from "../http/deviceAPI";

export const fetchAllBrands = async (currentStore, sortBy, sortDirection) => {
  const fetchedServerBrands = await getBrands(sortBy, sortDirection);
  if (fetchedServerBrands.count === 0) alert('Nothing found!')
  await currentStore.setBrands(fetchedServerBrands);
}

export const changeBrandData = async (id, name) => {
  const updated = await updateBrand(id, name);
  return updated;
}
export const deleteBrand = async (id) => {
  const deleted = await deleteBrandReq(id);
  return deleted;
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
