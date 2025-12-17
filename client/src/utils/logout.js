import { deleteLocalStoreCart } from "./cart/setLocalStoreCart";
import { logout as logoutAPI } from "../http/userAPI";

export const logoutOnClient = async(cartStore, userStore) => {
    userStore.reset();

    cartStore.setCartDevices([]);
    cartStore.setCart([]);
    cartStore.setCartId(0);
    cartStore.setItemsCount(0);

    deleteLocalStoreCart();
    localStorage.removeItem('token');
    return {loggedOut: true}
}
export const logoutOnServer = async() => {
    await logoutAPI();
}