import { getOrders, updateOrder, deleteOrderReq, fetchOrderDetailsReq } from "../http/orderAPI";
import { logoutOnClient } from "./logout";

export const fetchAllOrders = async(sortBy, sortDirection, limit, page, searchBy, searchPrase) => {
    const fetchedServerOrders = await getOrders( sortBy, sortDirection, limit, page, searchBy, searchPrase); //sortBy, sortDirection, limit, page, searchBy, searchPrase
    if(fetchedServerOrders.count === 0) alert('Nothing found!')
    return fetchedServerOrders;
  }
export const setOrdersToStore = async (store, orders) => {
  await store.setUserOrders(orders);
}

export const fetchUserOrders = async(userOrdersStore, cartStore, userStore) => {
  if(!userOrdersStore.searchByPrase)return;
    try {
        userOrdersStore.setLoading(true);
      const data = await fetchAllOrders(userOrdersStore.sortBy, userOrdersStore.sortDirection, userOrdersStore.itemsPerPage, userOrdersStore.activePage, userOrdersStore.searchBy, userOrdersStore.searchByPrase);
      await setOrdersToStore(userOrdersStore, data);
      return data;
    } catch (e) {
      if(e.response.status === 401 && userStore.isAuth){
        alert('Session timed out. You have to login again to continue. (adminUserOrders 1)');
        return logoutOnClient(cartStore, userStore);
      }
      throw e;
    } finally {
        userOrdersStore.setLoading(false);
    }
  }
