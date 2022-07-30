import { deleteLocalStoreCart } from "./setLocalStoreCart";
import { logout as logoutAPI } from "../http/userAPI";

export const logoutOnClient = async(cart, user) => {
    user.setUser({});
    user.setIsAuth(false);
    user.setIsSuperUser(false);

    cart.setCartDevices([]);
    cart.setCart([]);
    cart.setCartId(0);
    cart.setItemsCount(0);

    deleteLocalStoreCart();
    localStorage.removeItem('token');
}
export const logoutOnServer = async() => {
    await logoutAPI();
}