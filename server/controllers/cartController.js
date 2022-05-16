const ApiError = require('../error/ApiError');
const cartService = require('../service/cart/cart-service');

class cartController {
    async createOrUpdate(req, res, next) {
        try {
            const { items, addAmountToExisted } = req.body;
            await cartService.createOrUpdate(items, addAmountToExisted);
            return res.json({updated: true});
        } catch (e) {
            next(ApiError.badRequest(e.message + ': could not create or update cart'));
        }
    }
    async getAll(req, res, next) {
        try {
            const { query } = req;
            const item = await cartService.getAll(query);
            res.json(item);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async deleteOne(req, res, next) {
        try {
            const { query } = req;
            const item = await cartService.deleteOne(query);
            res.json(item)
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getBasketId(req, res, next) {
        try {
            const { id } = req.user;
            const cart = await cartService.getCartId(id);
            res.json(cart.id);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new cartController();