import { getUsers, updateUser, deleteUserReq } from "../http/userAPI";

export const fetchAllUsers = async(currentStore, sortBy, sortDirection, limit, page, searchBy, searchPrase) => {
    const fetchedServerUsers = await getUsers( sortBy, sortDirection, limit, page, searchBy, searchPrase); //sortBy, sortDirection, limit, page, searchBy, searchPrase
    if(fetchedServerUsers.count === 0) alert('Nothing found!')
    await currentStore.setUsers(fetchedServerUsers);
}

export const changeUserData = async(id, dbFieldName, data) => {
    const updated = await updateUser(id, dbFieldName, data); 
    return updated;
}
export const deleteUser = async(id) => {
    const deleted = await deleteUserReq(id); 
    return deleted;
}

export const fetchPage = async(usersStore) => {
    try {
        usersStore.setLoading(true);
      await fetchAllUsers(usersStore, usersStore.sortBy, usersStore.sortDirection, usersStore.itemsPerPage, usersStore.activePage, usersStore.searchBy, usersStore.searchByPrase);
      usersStore.setPagesTotal(Math.ceil(usersStore.users.count / usersStore.itemsPerPage));
    } catch (e) {
      console.log(e)
    } finally {
        usersStore.setLoading(false);
    }
  }