const ApiError = require('../error/ApiError');
const orderService = require('../service/order/order-service');

class orderController {

    async create(req, res, next) {
        try {
            const {order, basketId} = req.body;
            const {id} = req.user;
            if(order.length === 0){
                return next(ApiError.badRequest('no devices or it\'s amount received in request'));
            }
            const orderDevice = await orderService.create(order, basketId, id);
            return res.json(orderDevice);
        } catch (e) {
            next(ApiError.badRequest(e.message + ': could not create order'));
        }
    }
    async getAll(req, res, next){
        try {
            let { sortBy, sortDirection, limit, page, searchBy, searchPrase } = req.query;
            const orders = await orderService.getAll(sortBy, sortDirection, limit, page, searchBy, searchPrase);
            return res.json(orders);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
}

module.exports = new orderController();