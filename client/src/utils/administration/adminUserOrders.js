﻿import { getOrders } from "../../http/orderAPI";
import { logoutOnClient } from "../logout";
import { fetchAll, setDataToStore } from "./common";

export const fetchUserOrders = async(userOrdersStore, cartStore, userStore) => {
  if(!userOrdersStore.searchByPrase)return;
    try {
        userOrdersStore.setLoading(true);
      const data = await fetchAll(getOrders, null, userOrdersStore.sortBy, userOrdersStore.sortDirection, userOrdersStore.itemsPerPage, userOrdersStore.activePage, userOrdersStore.searchBy, userOrdersStore.searchByPrase);
      await setDataToStore(userOrdersStore, 'setUserOrders', data);
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
