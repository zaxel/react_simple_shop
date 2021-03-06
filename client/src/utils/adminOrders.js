import { getOrders, updateOrder, deleteOrderReq } from "../http/orderAPI";

export const fetchAllOrders = async(currentStore, sortBy, sortDirection, limit, page, searchBy, searchPrase) => {
    const fetchedServerOrders = await getOrders( sortBy, sortDirection, limit, page, searchBy, searchPrase); //sortBy, sortDirection, limit, page, searchBy, searchPrase
    if(fetchedServerOrders.count === 0) alert('Nothing found!')
    await currentStore.setOrders(fetchedServerOrders);
}

export const changeOrderData = async(id, dbFieldName, data) => {
    const updated = await updateOrder(id, dbFieldName, data); 
    return updated;
}
export const deleteOrder = async(id) => {
    const deleted = await deleteOrderReq(id); 
    return deleted;
}

export const fetchPage = async(ordersStore) => {
    try {
        ordersStore.setLoading(true);
      await fetchAllOrders(ordersStore, ordersStore.sortBy, ordersStore.sortDirection, ordersStore.itemsPerPage, ordersStore.activePage, ordersStore.searchBy, ordersStore.searchByPrase);
      ordersStore.setPagesTotal(Math.ceil(ordersStore.orders.count / ordersStore.itemsPerPage));
    } catch (e) {
      console.log(e)
    } finally {
        ordersStore.setLoading(false);
    }
  }