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
            let { sortBy, sortDirection, limit, page, searchBy, searchPhrase } = req.query;
            const orders = await orderService.getAll(sortBy, sortDirection, limit, page, searchBy, searchPhrase);
            return res.json(orders);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async delete(req, res, next){
        try{
            const { id } = req.body;
            const data = await orderService.delete(id);
            return res.json(data);
        }catch(e){
            next(ApiError.badRequest(e.message + ': could not delete order.'));
        }
    }
}

module.exports = new orderController();