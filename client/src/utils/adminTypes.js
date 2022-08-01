import { fetchAllTypes as getTypes, updateType, deleteTypeReq, createTypes } from "../http/deviceAPI";
import { logoutOnClient } from "./logout";

export const fetchAllTypes = async (sortBy, sortDirection) => {
  const fetchedServerTypes = await getTypes(sortBy, sortDirection);
  if (fetchedServerTypes.count === 0) alert('Nothing found!')
  return fetchedServerTypes;
}
export const setTypesToStore = async (store, types) => {
  await store.setTypes(types); 
}

export const changeTypeData = async (id, name, cartStore, userStore) => {
  try {
    const updated = await updateType(id, name);
    return updated;
  } catch (e) {
    if (e.response.status === 401) {
      logoutOnClient(cartStore, userStore);
      alert('Session timed out. You have to login again to continue."');
    }
    throw e;
  }
}

export const deleteType = async (id, cartStore, userStore) => {
  try {
    const deleted = await deleteTypeReq(id);
  return deleted;
  } catch (e) {
    if (e.response.status === 401) {
      logoutOnClient(cartStore, userStore);
      alert('Session timed out. You have to login again to continue."');
    }
    throw e;
  }
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

export const addNewTypes = async (types, cartStore, userStore) => {
  try {
    const data = await createTypes(types);
    return data;
  } catch (e) {
    if (e.response.status === 401) {
      logoutOnClient(cartStore, userStore);
      alert('Session timed out. You have to login again to continue."');
    }
    throw e;
  }
}
