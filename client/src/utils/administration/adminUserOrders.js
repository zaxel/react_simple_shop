import { getOrders } from "../../http/orderAPI";
import { fetchAll, fetchDataSetStore } from "./common";

export const fetchUserOrders = async (userOrdersStore, cartStore, userStore) => {
  const flags = { loadingOn: true, loadingOff: true, setToStore: true, setPageTotal: false, checkIfAuth: true };
  const cb = fetchAll.bind(this, getOrders, null, userOrdersStore.sortBy, userOrdersStore.sortDirection, userOrdersStore.itemsPerPage, userOrdersStore.activePage, userOrdersStore.searchBy, userOrdersStore.searchByPrase);

  if (!userOrdersStore.searchByPrase) return;
  return fetchDataSetStore(cb, userOrdersStore, cartStore, userStore, flags);
}
