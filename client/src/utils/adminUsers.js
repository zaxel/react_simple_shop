import { getUsers, updateUser, deleteUserReq } from "../http/userAPI";

export const fetchAllUsers = async(currentStore, sortBy, sortDirection, limit, page, searchBy, searchPrase) => {
    const fetchedServerUsers = await getUsers( sortBy, sortDirection, limit, page, 'is_activated', false); //sortBy, sortDirection, limit, page, searchBy, searchPrase
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