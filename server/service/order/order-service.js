const { Order, OrderDevice, BasketDevice } = require('../../models/models');
class OrderService{
    create = async (order, basketId, id) => {
        const newOrder = await Order.create({userId: id});
        const ordersData = order.map(el => {
            return {device_amount: el.amount, deviceId: el.deviceId, orderId:  newOrder.id};
        })
        const orderDevice = await OrderDevice.bulkCreate(ordersData);
        const deletedAmount = await BasketDevice.destroy({
            where: {basketId}
        });
        return orderDevice;
    }
}

module.exports = new OrderService();