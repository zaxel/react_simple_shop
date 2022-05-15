import { deleteLocalStoreCart } from "./setLocalStoreCart";
import { logout as logoutAPI } from "../http/userAPI";

export const logout = async(cart, user) => {
    await logoutAPI();
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