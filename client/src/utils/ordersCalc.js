export const calcTotal = (cart) => {
    const total = cart.cart.reduce((prev, next)=>{
        const device = cart.cartDevices.find(el=>el.id===next.deviceId);
        return prev+device.price*next.device_amount;
    }, 0)
    return total;
}