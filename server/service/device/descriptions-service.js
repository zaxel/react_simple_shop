const { DeviceInfo } = require('../../models/models');
const { Op, Sequelize } = require("sequelize");
const {orderDescriptionsOptions} = require('../../utils/searchOptions');
// const orderDevicesOptions = require('../../utils/searchOptions');

class DescriptionsService {
    
    getDescriptions = async (deviceId, sortBy, sortDirection = 'ASC') => {
        // const descriptions = await DeviceInfo.findOne({
        //     where: { id },
        // });
        
console.log(deviceId)
        let where = { deviceId };
        let order = orderDescriptionsOptions(sortBy, sortDirection);

        let descriptions = await DeviceInfo.findAndCountAll({where, order});


        return descriptions;
    }
    
}
module.exports = new DescriptionsService();