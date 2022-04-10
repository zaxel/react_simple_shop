import { createOrUpdateCartDevice } from "../http/cartAPI"

export const addToCart = async(isAuth, basketId, deviceId, device_amount) => {
    isAuth ?
    await createOrUpdateCartDevice(basketId, deviceId, device_amount) :
    console.log('not logged in')
}