import { fetchSingleDevice } from "../http/deviceAPI";
import { fetchCartDevices } from "./fetchSetCart";

export const setLocalStoreCart = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart.cart));
}
export const deleteLocalStoreCart = (cart) => {
    localStorage.removeItem('cart');
}
export const setCartFromLocalStore = async(cart) => {
    cart.setCart(JSON.parse(localStorage.getItem('cart'))|| []);
    cart.calcItemsCount();
    fetchCartDevices(cart);
}