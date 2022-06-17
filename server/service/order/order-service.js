const { Order, OrderDevice, BasketDevice, User } = require('../../models/models');
const { Op } = require("sequelize");
const OrderDto = require('../../dtos/order-dto');
const { searchOrdersOptions } = require('../../utils/searchOptions');

class OrderService {
    create = async (order, basketId, id) => {
        const newOrder = await Order.create({ userId: id });
        const ordersData = order.map(el => {
            return { device_amount: el.amount, deviceId: el.deviceId, orderId: newOrder.id };
        })
        const orderDevice = await OrderDevice.bulkCreate(ordersData);
        const deletedAmount = await BasketDevice.destroy({
            where: { basketId }
        });
        return orderDevice;
    }

    getAll = async (sortBy, sortDirection = 'ASC', limit, page, searchBy, searchPrase) => {
        const startPage = process.env.START_ADMIN_ORDER_PAGE;
        const defaultLimit = process.env.DEFAULT_ADMIN_ORDER_LIMIT;
        page = page || startPage;
        limit = limit || defaultLimit;
        let offset = page * limit - limit;
        let where = searchOrdersOptions(searchBy, searchPrase);
        // let where = null;

        let ordersGeneral = await Order.findAndCountAll({
            where,
            order: [
                [sortBy, sortDirection],
            ], limit, offset
        });

        const ordersIds = ordersGeneral.rows.map(el => ({ orderId: el.id }));
        const usersIds = ordersGeneral.rows.map(el => ({ id: el.userId }));

        let ordersDetails = await OrderDevice.findAll({
            where: {
                [Op.or]: ordersIds
            }
        });

        let users = await User.findAll({
            where: {
                [Op.or]: usersIds
            }
        });
        const orders = {
            count: ordersGeneral.count,
            rows: ordersGeneral.rows.map(order=>new OrderDto({order, ordersDetails, users})) 
        }
        return orders;
    }

    delete = async (id) => {
        const updatedData = await Order.destroy({
            where: { id }
          });
        return {updatedData};
    }
}

module.exports = new OrderService();