import { deleteLocalStoreCart } from "./setLocalStoreCart";

export const logout = (cart, user) => {
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