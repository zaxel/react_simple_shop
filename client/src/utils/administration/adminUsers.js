import { getUsers, updateUser, deleteUserReq } from "../../http/userAPI";
import { fetchAll, fetchDataSetStore } from "./common";


export const changeUserData = async (id, dbFieldName, data, cartStore, userStore) => {
  const flags = { loadingOn: false, loadingOff: false, setToStore: false, setPageTotal: false, checkIfAuth: true };
  const cb = updateUser.bind(this, id, dbFieldName, data);
  return fetchDataSetStore(cb, null, cartStore, userStore, flags);
}

export const deleteUser = async (id, cartStore, userStore) => {
  const flags = { loadingOn: false, loadingOff: false, setToStore: false, setPageTotal: false, checkIfAuth: true };
  const cb = deleteUserReq.bind(this, id);
  return fetchDataSetStore(cb, null, cartStore, userStore, flags);
}

export const fetchPage = async (adminUsersStore, cartStore, userStore) => {
  const flags = { loadingOn: true, loadingOff: true, setToStore: true, setPageTotal: true, checkIfAuth: true };
  const cb = fetchAll.bind(this, getUsers, null, adminUsersStore.sortBy, adminUsersStore.sortDirection, adminUsersStore.itemsPerPage, adminUsersStore.activePage, adminUsersStore.searchBy, adminUsersStore.searchByPrase);
  return fetchDataSetStore(cb, adminUsersStore, cartStore, userStore, flags);
}