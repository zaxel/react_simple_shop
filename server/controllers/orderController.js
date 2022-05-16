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
}

module.exports = new orderController();