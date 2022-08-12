import { getUsers, updateUser, deleteUserReq } from "../../http/userAPI";
import { logoutOnClient } from "../logout";
import { fetchAll } from "./common";


export const setUsersToStore = async (store, users) => {
  await store.setUsers(users);
}

export const changeUserData = async (id, dbFieldName, data, cartStore, userStore) => {
  try {
    const updated = await updateUser(id, dbFieldName, data);
    return updated;
  } catch (e) {
    if (e.response.status === 401 && userStore.isAuth) {
      alert('Session timed out. You have to login again to continue. (adminUsers 1)');
      return logoutOnClient(cartStore, userStore);
    }
    console.log(e);
    throw e;
  }

}
export const deleteUser = async (id, cartStore, userStore) => {
  try {
    const deleted = await deleteUserReq(id);
    return deleted;
  } catch (e) {
    if (e.response.status === 401 && userStore.isAuth) {
      alert('Session timed out. You have to login again to continue. (adminUsers 2)');
      return logoutOnClient(cartStore, userStore);
    }
    console.log(e);
    throw e;
  }
}

export const fetchPage = async (adminUsersStore, cartStore, userStore) => {
  try {
    adminUsersStore.setLoading(true);
    const data = await fetchAll(getUsers, null, adminUsersStore.sortBy, adminUsersStore.sortDirection, adminUsersStore.itemsPerPage, adminUsersStore.activePage, adminUsersStore.searchBy, adminUsersStore.searchByPrase);
    setUsersToStore(adminUsersStore, data);
    adminUsersStore.setPagesTotal(Math.ceil(adminUsersStore.users.count / adminUsersStore.itemsPerPage));
    return data;
  } catch (e) {
    if (e.response.status === 401 && userStore.isAuth) {
      alert('Session timed out. You have to login again to continue. (adminUsers 3)');
      return logoutOnClient(cartStore, userStore);
    }
    console.log(e);
    throw e;
  } finally {
    adminUsersStore.setLoading(false);
  }
}