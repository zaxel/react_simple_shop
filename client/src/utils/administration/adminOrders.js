import { getOrders, updateOrder, deleteOrderReq, fetchOrderDetailsReq } from "../../http/orderAPI";
import { fetchAll, fetchDataSetStore } from "./common";


export const changeOrderData = async (id, dbFieldName, data) => {
  const flags = { loadingOn: false, loadingOff: false, setToStore: false, setPageTotal: false, checkIfAuth: false };
  const cb = updateOrder.bind(this, id, dbFieldName, data);
  return fetchDataSetStore(cb, null, null, null, flags);
}

export const deleteOrder = async (id, cartStore, userStore) => {
  const flags = { loadingOn: false, loadingOff: false, setToStore: false, setPageTotal: false, checkIfAuth: true };
  const cb = deleteOrderReq.bind(this, id);
  return fetchDataSetStore(cb, null, cartStore, userStore, flags);
}

export const fetchPage = async (ordersStore, cartStore, userStore) => {
  const flags = { loadingOn: true, loadingOff: true, setToStore: true, setPageTotal: true, checkIfAuth: true };
  const cb = fetchAll.bind(this, getOrders, null, ordersStore.sortBy, ordersStore.sortDirection, ordersStore.itemsPerPage, ordersStore.activePage, ordersStore.searchBy, ordersStore.searchByPrase);
  return fetchDataSetStore(cb, ordersStore, cartStore, userStore, flags);
}

export const fetchOrderDetails = async (currentStore, orderId, cartStore, userStore) => {
  if (!orderId) return;
  const flags = { loadingOn: true, loadingOff: true, setToStore: true, setPageTotal: false, checkIfAuth: true };
  const cb = fetchAll.bind(this, fetchOrderDetailsReq, orderId, currentStore.sortBy, currentStore.sortDirection);
  return fetchDataSetStore(cb, currentStore, cartStore, userStore, flags);
}
