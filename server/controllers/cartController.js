const { BasketDevice, Basket } = require('../models/models');
const ApiError = require('../error/ApiError');

class cartController {
    async createOrUpdate(req, res, next) {
        try {
            const { body } = req;
            const foundItem = await BasketDevice.findOne({ 
                where: { 
                    basketId: body.basketId, 
                    deviceId: body.deviceId
                } 
            });

            if (!foundItem) {
                // Item not found, create a new one
                const item = await BasketDevice.create(body);
                return res.json({ item, created: true });
            }
            // Found an item, update it
            const item = await BasketDevice.update(
                    { device_amount: body.device_amount }, 
                    { where: { 
                        basketId: body.basketId,
                        deviceId: body.deviceId
                     } }
                );
            return res.json({ item, created: false });

        } catch (e) {
            next(ApiError.badRequest(e.message + ': could not create or update cart'));
        }

    }
    async getAll(req, res, next) {
        try {
            const { body } = req;
            const cart = await Basket.findOne({where: {userId: body.userId}});
            if(!cart){
                return next(ApiError.badRequest(e.message+': no user with provided id found'));
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

}

module.exports = new cartController();