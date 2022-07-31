import { getOrders, updateOrder, deleteOrderReq, fetchOrderDetailsReq } from "../http/orderAPI";
import { logoutOnClient } from "./logout";

export const fetchAllOrders = async(currentStore, sortBy, sortDirection, limit, page, searchBy, searchPrase) => {
    const fetchedServerOrders = await getOrders( sortBy, sortDirection, limit, page, searchBy, searchPrase); //sortBy, sortDirection, limit, page, searchBy, searchPrase
    if(fetchedServerOrders.count === 0) alert('Nothing found!')
    await currentStore.setOrders(fetchedServerOrders);
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
    if(e.response.status === 401){
      logoutOnClient(cartStore, userStore);
    }
    throw e;
  }
    
}

export const fetchPage = async(ordersStore, cartStore, userStore) => {
    try {
        ordersStore.setLoading(true);
      await fetchAllOrders(ordersStore, ordersStore.sortBy, ordersStore.sortDirection, ordersStore.itemsPerPage, ordersStore.activePage, ordersStore.searchBy, ordersStore.searchByPrase);
      ordersStore.setPagesTotal(Math.ceil(ordersStore.orders.count / ordersStore.itemsPerPage));
    } catch (e) {
      if(e.response.status === 401){
        logoutOnClient(cartStore, userStore);
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
      if(e.response.status === 401){
        logoutOnClient(cartStore, userStore);
      }
      throw e;
    } finally {
      currentStore.setLoading(false);
    }
  }
