const { DeviceInfo } = require('../../models/models');
const {orderDescriptionsOptions} = require('../../utils/searchOptions');

class DescriptionsService {
    
    getDescriptions = async (deviceId, sortBy, sortDirection = 'ASC') => {
console.log(deviceId)
        let where = { deviceId };
        let order = orderDescriptionsOptions(sortBy, sortDirection);
        let descriptions = await DeviceInfo.findAndCountAll({where, order});
        return descriptions;
    }
    
}
module.exports = new DescriptionsService();