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
    async getHistory(req, res, next) {
        try {
            const {id} = req.user;
            let { sortBy, sortDirection, limit, page, searchBy, searchPhrase } = req.query;

            if(!id)
                return next(ApiError.badRequest('user id address required.'));

            const result = await orderService.getHistory({userId: id, sortBy, sortDirection, limit, page, searchBy, searchPhrase});
            return res.json(result);
        } catch (e) {
            next(ApiError.badRequest(e.message + ': could not create order'));
        }
    }
    async checkout(req, res, next) {
        try {
            const {order} = req.body;
            const {id} = req.user;

            if(!order || !order.address)
                return next(ApiError.badRequest('shipping address required.'));

            const result = await orderService.checkout(id, order.address);
            return res.json(result);
        } catch (e) {
            next(ApiError.badRequest(e.message + ': could not create order'));
        }
    }
    async resolveBySession(req, res, next) {
        try {
            const { session_id } = req.params;

            if(!session_id)
                return next(ApiError.badRequest('session_id is required.'));

            const result = await orderService.resolveBySession({stripeSessionId: session_id});
            return res.json(result);
        } catch (e) {
            next(ApiError.badRequest(e.message + ': unexpected error'));
        }
    }
}

module.exports = new orderController();