const { OrderDevice, Device } = require('../../models/models');
const { Op } = require("sequelize");
const OrderDetailsDto = require('../../dtos/order-details-dto');
const brand = require('../brand/brand-service');

class OrderDetailsService {

    getDetails = async (orderId, sortBy = 'id', sortDirection = 'ASC') => {
        let orderDevices = await OrderDevice.findAll({
            where: { orderId }
        });
        const devicesIds = orderDevices.map(el => ({ id: el.deviceId }));
        const devicesInOrder = await Device.findAndCountAll({
            where: {
                [Op.or]: devicesIds
            },
            order: [
                [sortBy, sortDirection],
            ]
        });


        const rows = await Promise.all(
            devicesInOrder.rows.map(async device => {
                const brandRes = await brand.get({ id: device.brandId });
                return new OrderDetailsDto({ orderId, device, orderDevices, brandRes, createdAt: orderDevices[0].createdAt });
            })
        );

        return {
            count: devicesInOrder.count,
            rows,
        };
    }
}

module.exports = new OrderDetailsService();