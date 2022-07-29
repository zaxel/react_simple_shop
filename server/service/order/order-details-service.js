const { OrderDevice, Device } = require('../../models/models');
const { Op } = require("sequelize");
const OrderDetailsDto = require('../../dtos/order-details-dto');

class OrderDetailsService {
    
    getDetails = async (orderId) => {
        let orderDevices = await OrderDevice.findAll({
            where:  {orderId}
        });
        const devicesIds = orderDevices.map(el => ({ id: el.deviceId }))
        const devicesInOrder = await Device.findAndCountAll({
            where: {
                [Op.or]: devicesIds
            }
        }); 
        const orderDetails = {
            count: devicesInOrder.count,
            rows: devicesInOrder.rows.map(device=>new OrderDetailsDto({orderId, device, orderDevices}))
        }
        return orderDetails;
    }
}

module.exports = new OrderDetailsService();