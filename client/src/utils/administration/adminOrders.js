import { getOrders, updateOrder, deleteOrderReq, fetchOrderDetailsReq } from "../../http/orderAPI";
import { logoutOnClient } from "../logout";
import { fetchAll, setDataToStore } from "./common";


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
      alert('Session timed out. You have to login again to continue. (adminOrders 0)');
      return logoutOnClient(cartStore, userStore);
    }
    throw e;
  }
    
}

export const fetchPage = async(ordersStore, cartStore, userStore) => {
    try {
        ordersStore.setLoading(true);
      const data = await fetchAll(getOrders, null, ordersStore.sortBy, ordersStore.sortDirection, ordersStore.itemsPerPage, ordersStore.activePage, ordersStore.searchBy, ordersStore.searchByPrase);
      ordersStore.setPagesTotal(Math.ceil(ordersStore.orders.count / ordersStore.itemsPerPage));
      await setDataToStore(ordersStore, 'setOrders', data);
    } catch (e) {
      if(e.response.status === 401 && userStore.isAuth){
        alert('Session timed out. You have to login again to continue. (adminOrders 1)');
        return logoutOnClient(cartStore, userStore);
      }
      throw e;
    } finally {
        ordersStore.setLoading(false);
    }
  }

  export const fetchOrderDetails = async (currentStore, orderId, cartStore, userStore) => {
    if(!orderId)return;
    try {
      currentStore.setLoading(true);
      const data = await fetchAll(fetchOrderDetailsReq, orderId, currentStore.sortBy, currentStore.sortDirection,);
      await currentStore.setOrderDetails(data);
      return data;
    } catch (e) {
      if(e.response.status === 401 && userStore.isAuth){
        alert('Session timed out. You have to login again to continue. (adminOrders 2)');
        return logoutOnClient(cartStore, userStore);
      }
      throw e;
    } finally {
      currentStore.setLoading(false);
    }
  }
