import { fetchAllTypes as getTypes, updateType, deleteTypeReq } from "../http/deviceAPI";

export const fetchAllTypes = async (currentStore, sortBy, sortDirection) => {
  const fetchedServerTypes = await getTypes(sortBy, sortDirection);
  if (fetchedServerTypes.count === 0) alert('Nothing found!')
  await currentStore.setTypes(fetchedServerTypes);
}

export const changeTypeData = async (id, name) => {
  const updated = await updateType(id, name);
  return updated;
}
export const deleteType = async (id) => {
  const deleted = await deleteTypeReq(id);
  return deleted;
}

export const fetchPage = async (adminTypesStore) => {
  try {
    adminTypesStore.setLoading(true);
    await fetchAllTypes(adminTypesStore, adminTypesStore.sortBy, adminTypesStore.sortDirection);
  } catch (e) {
    console.log(e);
    alert(e.response.data.message);
  } finally {
    adminTypesStore.setLoading(false);
  }
}
