const ApiError = require('../error/ApiError');
const cartService = require('../service/cart/cart-service');

class cartController {
    async merge(req, res, next) {
        try {
            const { items } = req.body;
            const { id } = req.user;
            const cartItem = await cartService.merge({ items, userId: id}); 
            return res.json(cartItem);
        } catch (e) {
            next(ApiError.badRequest(e.message + ': could not merge items in cart'));
        }
    }

    async addItem(req, res, next) {
        try {
            const { deviceId, quantity } = req.body;
            const { id } = req.user;
            const cartItem = await cartService.addItem({ deviceId, quantity, userId: id});
            return res.json(cartItem);
        } catch (e) {
            next(ApiError.badRequest(e.message + ': could not create or update cart'));
        }
    }

    async getAll(req, res, next) {
        try {
            const { id } = req.user;
            const item = await cartService.getAll({userId: id});
            res.json(item);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async updateQuantity(req, res, next) {
        try {
            const { id } = req.user;
            const { itemId } = req.params;
            const { quantity } = req.body;

            const data = await cartService.updateQuantity({userId: id, itemId, quantity});
            res.json(data);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async deleteItem(req, res, next) {
        try {
            const { id } = req.user;
            const { itemId } = req.params;

            const data = await cartService.deleteItem({userId: id, itemId});
            res.json(data);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async clearCart(req, res, next) {
        try {
            const { id } = req.user;

            const data = await cartService.clearCart({userId: id});
            res.json(data);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async fromSnapshot(req, res, next) {
        try {
            const { snapshot } = req.body;

            const data = await cartService.fromSnapshot({snapshot});
            res.json(data);
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

}

module.exports = new cartController();