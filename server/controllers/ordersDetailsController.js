const ApiError = require('../error/ApiError');
const orderDetailsService = require('../service/order/order-details-service');
const { validationResult } = require('express-validator');

class ordersDetailsController {
    async getOrderDescriptions(req, res, next) {
        try {
            const { orderId } = req.params;
            const {sortBy, sortDirection} = req.query;
            // console.log(88, orderId, sortBy, sortDirection)

            const info = await orderDetailsService.getDetails(orderId, sortBy, sortDirection);
            return res.json(info);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    
}

module.exports = new ordersDetailsController();