const { BasketDevice } = require('../models/models');
const ApiError = require('../error/ApiError');

class cartController {
    async createOrUpdate(req, res, next) {
        try {
            const { body } = req;
            const foundItem = await BasketDevice.findOne({ where: {basketId: body.basketId} });
            if (!foundItem) {
                // Item not found, create a new one
                const item = await BasketDevice.create(body);
                return res.json({ item, created: true });
            }
            // Found an item, update it
            const item = await BasketDevice.update({device_amount: body.device_amount}, { where: {basketId: body.basketId}});
            return res.json({ item, created: false });

        } catch (e) {
            next(ApiError.badRequest(e.message + ': could not create or update cart'));
        }

    }
    async get(req, res) {
        // const BasketDevice = await BasketDevice.findAll();
        // res.json(types)
        console.log(req.user)
    }

}

module.exports = new cartController();