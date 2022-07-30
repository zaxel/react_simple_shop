import { getUsers, updateUser, deleteUserReq } from "../http/userAPI";
import { logoutOnClient } from "./logout";

export const fetchAllUsers = async(currentStore, sortBy, sortDirection, limit, page, searchBy, searchPrase) => {
    const fetchedServerUsers = await getUsers( sortBy, sortDirection, limit, page, searchBy, searchPrase); //sortBy, sortDirection, limit, page, searchBy, searchPrase
    if(fetchedServerUsers.count === 0) alert('Nothing found!')
    await currentStore.setUsers(fetchedServerUsers);
    return fetchedServerUsers;
}

export const changeUserData = async(id, dbFieldName, data) => {
    const updated = await updateUser(id, dbFieldName, data); 
    return updated;
}
export const deleteUser = async(id) => {
    const deleted = await deleteUserReq(id); 
    return deleted;
}

export const fetchPage = async(adminUsersStore, cartStore, userStore) => {
    try {
        adminUsersStore.setLoading(true);
      const data = await fetchAllUsers(adminUsersStore, adminUsersStore.sortBy, adminUsersStore.sortDirection, adminUsersStore.itemsPerPage, adminUsersStore.activePage, adminUsersStore.searchBy, adminUsersStore.searchByPrase);
      adminUsersStore.setPagesTotal(Math.ceil(adminUsersStore.users.count / adminUsersStore.itemsPerPage));
      return data;
    } catch (e) {
      if(e.response.status === 401){
        logoutOnClient(cartStore, userStore);
      }
      throw e;
    } finally {
        adminUsersStore.setLoading(false);
    }
  }