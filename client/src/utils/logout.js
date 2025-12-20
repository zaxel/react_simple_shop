import { logout } from "../http/userAPI";
import { clearLocalStoreCartSnapshot } from "./cart/localStoreCartSnapshot";

export const logoutOnClient = async(cartStore, userStore) => {
    userStore.reset();
    cartStore.clearCart(true);
    clearLocalStoreCartSnapshot();
    localStorage.removeItem('token');
    return {loggedOut: true}
}
export const logoutOnServer = async(cartStore) => { 
    await logout();
}