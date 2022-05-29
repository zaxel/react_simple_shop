import { getUsers } from "../http/userAPI";

export const fetchAllUsers = async(currentStore, sortBy, sortDirection, limit, page) => {
    const fetchedServerUsers = await getUsers( sortBy, sortDirection, limit, page); //sortBy, sortDirection, limit, page
    await currentStore.setUsers(fetchedServerUsers);
}