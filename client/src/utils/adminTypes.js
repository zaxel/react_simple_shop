import { fetchAllTypes as getTypes, updateType, deleteTypeReq } from "../http/deviceAPI";

export const fetchAllTypes = async (sortBy, sortDirection) => {
  const fetchedServerTypes = await getTypes(sortBy, sortDirection);
  if (fetchedServerTypes.count === 0) alert('Nothing found!')
  return fetchedServerTypes;
}
export const setTypesToStore = async (store, types) => {
  await store.setTypes(types); 
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
    const data = await fetchAllTypes(adminTypesStore.sortBy, adminTypesStore.sortDirection);
    setTypesToStore(adminTypesStore, data);
  } catch (e) {
    console.log(e);
    alert(e.response.data.message);
  } finally {
    adminTypesStore.setLoading(false);
  }
}
