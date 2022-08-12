import { fetchAllTypes, updateType, deleteTypeReq, createTypes } from "../../http/deviceAPI";
import { logoutOnClient } from "../logout";
import { fetchAll, setDataToStore } from "./common";

export const changeTypeData = async (id, name, cartStore, userStore) => {
  try {
    const updated = await updateType(id, name);
    return updated;
  } catch (e) {
    if (e.response.status === 401 && userStore.isAuth) {
      alert('Session timed out. You have to login again to continue. (adminTypes 1)');
      return logoutOnClient(cartStore, userStore);
    }
    throw e;
  }
}

export const deleteType = async (id, cartStore, userStore) => {
  try {
    const deleted = await deleteTypeReq(id);
  return deleted;
  } catch (e) {
    if (e.response.status === 401 && userStore.isAuth) {
      alert('Session timed out. You have to login again to continue. (adminTypes 2)');
      return logoutOnClient(cartStore, userStore);
    }
    throw e;
  }
}




export const fetchPage = async (adminTypesStore) => {
  try {
    adminTypesStore.setLoading(true);
    const data = await fetchAll(fetchAllTypes, null, adminTypesStore.sortBy, adminTypesStore.sortDirection);
    await setDataToStore(adminTypesStore, 'setTypes', data);
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
    if (e.response.status === 401 && userStore.isAuth) {
      alert('Session timed out. You have to login again to continue. (adminTypes 3)');
      return logoutOnClient(cartStore, userStore);
    }
    throw e;
  }
}
