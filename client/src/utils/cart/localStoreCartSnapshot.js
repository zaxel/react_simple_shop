
export const setLocalStoreCartSnapshot = (cartData) => { 
    localStorage.setItem('cart', JSON.stringify(cartData)); 
}

export const clearLocalStoreCartSnapshot = () => {
    localStorage.removeItem('cart');
}

export const getLocalStoreCartSnapshot = () => {
    return JSON.parse(localStorage.getItem('cart')) || [];
}