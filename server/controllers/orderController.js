const { Order, OrderDevice } = require('../models/models');
const ApiError = require('../error/ApiError');
const { Op } = require("sequelize");

class orderController {

    async create(req, res, next) {
        try {
            const {order} = req.body;
            const {id} = req.user;
            if(order.length === 0){
                return next(ApiError.badRequest('no devices or it\'s amount received in request'));
            }
            const newOrder = await Order.create({userId: id});

            const ordersData = order.map(el => {
                return {device_amount: el.amount, deviceId: el.deviceId, orderId:  newOrder.id};
            })

            const orderDevice = await OrderDevice.bulkCreate(ordersData);
            
            return res.json(orderDevice);

        } catch (e) {
            next(ApiError.badRequest(e.message + ': could not create order'));
        }

    }
    

}

module.exports = new orderController();