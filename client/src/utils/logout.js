import { deleteLocalStoreCart } from "./setLocalStoreCart";
import { logout as logoutAPI } from "../http/userAPI";

export const logoutOnClient = async(cartStore, userStore) => {
    userStore.setUser({});
    userStore.setIsAuth(false);
    userStore.setIsSuperUser(false);

    cartStore.setCartDevices([]);
    cartStore.setCart([]);
    cartStore.setCartId(0);
    cartStore.setItemsCount(0);

    deleteLocalStoreCart();
    localStorage.removeItem('token');
}
export const logoutOnServer = async() => {
    await logoutAPI();
}