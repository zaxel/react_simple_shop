const { Order, OrderDevice } = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require("sequelize");

class orderController {

    async createOrUpdate(req, res, next) {
        try {
            const { items, addAmountToExisted } = req.body;
            const itemsExistPromises = items.map(el => {
                return BasketDevice.findOne({
                    where: {
                        basketId: el.basketId,
                        deviceId: el.deviceId
                    }
                });
            })
            let foundItems = await Promise.all(itemsExistPromises);
            foundItems = foundItems.filter(el=>el!==null);

            if (foundItems.length !== 0) {
                const updateExistedPromises = foundItems.map(el => {
                    const amountInRequest = items.find(item =>item.basketId === el.basketId && item.deviceId === el.deviceId);
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

            return res.json({updated: true});

        } catch (e) {
            next(ApiError.badRequest(e.message + ': could not create or update cart'));
        }

    }
    async getAll(req, res, next) {
        try {
            const { query } = req;
            // console.log(req.user, query.userId)
            const cart = await Basket.findOne({ where: { userId: query.userId } });
            if (!cart) {
                return next(ApiError.badRequest(e.message + ': no user with provided id found'));
            }
            const item = await BasketDevice.findAndCountAll({ where: { basketId: cart.id } });
            res.json(item)
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async deleteOne(req, res, next) {
        try {
            const { query } = req;
            const item = await BasketDevice.destroy({
                where: {
                    basketId: query.basketId,
                    deviceId: query.deviceId
                }
            });
            res.json(item)
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getBasketId(req, res, next) {
        try {
            const cart = await Basket.findOne({ where: { userId: req.user.id } });
            if (!cart) {
                return next(ApiError.badRequest(e.message + ': no user with provided id found'));
            }
            res.json(cart.id);

        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

}

module.exports = new cartController();