import { getOrders, updateOrder, deleteOrderReq, fetchOrderDetailsReq } from "../http/orderAPI";
import { logoutOnClient } from "./logout";

export const fetchAllOrders = async(sortBy, sortDirection, limit, page, searchBy, searchPrase) => {
    const fetchedServerOrders = await getOrders( sortBy, sortDirection, limit, page, searchBy, searchPrase); //sortBy, sortDirection, limit, page, searchBy, searchPrase
    if(fetchedServerOrders.count === 0) alert('Nothing found!')
    return fetchedServerOrders;
  }
export const setOrdersToStore = async (store, orders) => {
  await store.setOrders(orders);
}

export const changeOrderData = async(id, dbFieldName, data) => {
    const updated = await updateOrder(id, dbFieldName, data); 
    return updated;
}
export const deleteOrder = async(id, cartStore, userStore) => {
  try{
    const deleted = await deleteOrderReq(id); 
    return deleted;
  }catch (e) {
    if(e.response.status === 401 && userStore.isAuth){
      logoutOnClient(cartStore, userStore);
    }
    throw e;
  }
    
}

export const fetchPage = async(ordersStore, cartStore, userStore) => {
    try {
        ordersStore.setLoading(true);
      const data = await fetchAllOrders(ordersStore.sortBy, ordersStore.sortDirection, ordersStore.itemsPerPage, ordersStore.activePage, ordersStore.searchBy, ordersStore.searchByPrase);
      ordersStore.setPagesTotal(Math.ceil(ordersStore.orders.count / ordersStore.itemsPerPage));
      setOrdersToStore(ordersStore, data);
    } catch (e) {
      if(e.response.status === 401 && userStore.isAuth){
        logoutOnClient(cartStore, userStore);
        alert('Session timed out. You have to login again to continue. (adminOrders 1)');
      }
      throw e;
    } finally {
        ordersStore.setLoading(false);
    }
  }

  export const fetchDetails = async (currentStore, orderId, sortBy, sortDirection) => {
    const fetchedOrderDetails = await fetchOrderDetailsReq(orderId, sortBy, sortDirection);
    if (fetchedOrderDetails.count === 0) console.log('Nothing found!')
    await currentStore.setOrderDetails(fetchedOrderDetails);
    return fetchedOrderDetails;
  }

  export const fetchOrderDetails = async (currentStore, orderId, cartStore, userStore) => {
    if(!orderId)return;
    try {
      currentStore.setLoading(true);
      const data = await fetchDetails(currentStore, orderId, currentStore.sortBy, currentStore.sortDirection,);
      return data;
    } catch (e) {
      if(e.response.status === 401 && userStore.isAuth){
        logoutOnClient(cartStore, userStore);
        alert('Session timed out. You have to login again to continue. (adminOrders 2)');
      }
      throw e;
    } finally {
      currentStore.setLoading(false);
    }
  }
