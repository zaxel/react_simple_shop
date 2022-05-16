const { BasketDevice, Basket } = require('../../models/models');
class CartService {
    createOrUpdate = async (items, addAmountToExisted) => {
        const itemsExistPromises = items.map(el => {
            return BasketDevice.findOne({
                where: {
                    basketId: el.basketId,
                    deviceId: el.deviceId
                }
            });
        })
        let foundItems = await Promise.all(itemsExistPromises);
        foundItems = foundItems.filter(el => el !== null);

        if (foundItems.length !== 0) {
            const updateExistedPromises = foundItems.map(el => {
                const amountInRequest = items.find(item => item.basketId === el.basketId && item.deviceId === el.deviceId);
                const newDeviceAmount = addAmountToExisted ? el.device_amount + amountInRequest.device_amount : amountInRequest.device_amount;
                return BasketDevice.update(
                    { device_amount: newDeviceAmount },
                    {
                        where: {
                            basketId: el.basketId,
                            deviceId: el.deviceId
                        }
                    }
                );

            })
            const updateExisted = await Promise.all(updateExistedPromises);
        }
        let createNewPromises = [];
        if (foundItems.length === 0) {
            createNewPromises = items;
        } else {
            items.forEach(el => {
                for (let device of foundItems) {
                    if (el.basketId === device.basketId && el.deviceId === device.deviceId) {
                        continue;
                    }
                    createNewPromises.push(el);
                }
            })
        }
        const createNew = await BasketDevice.bulkCreate(createNewPromises);
    }
    getAll = async (query) => {
        const cart = await Basket.findOne({ where: { userId: query.userId } });
        if (!cart) {
            return next(ApiError.badRequest(e.message + ': no user with provided id found'));
        }
        const item = await BasketDevice.findAndCountAll({ where: { basketId: cart.id } });
        return item;
    }
    deleteOne = async (query) => {
        const item = await BasketDevice.destroy({
            where: {
                basketId: query.basketId,
                deviceId: query.deviceId
            }
        });
        return item;
    }
    getCartId = async (userId) => {
        const cart = await Basket.findOne({ where: { userId } });
        if (!cart) {
            return next(ApiError.badRequest(e.message + ': no user with provided id found'));
        }
        return cart;
    }
}
module.exports = new CartService();