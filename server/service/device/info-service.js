const { DeviceInfo } = require('../../models/models');
const { orderInfoOptions } = require('../../utils/searchOptions');

class InfoService {

    getInfo = async (deviceId, sortBy, sortDirection = 'ASC') => {
        let where = { deviceId };
        let order = orderInfoOptions(sortBy, sortDirection);
        let info = await DeviceInfo.findAndCountAll({ where, order });
        return info;
    }
    update = async (id, field, newData) => {
        const updatedData = await DeviceInfo.update({ [field]: newData }, {
            where: { id }
        });
        return { updatedData };
    }
    createBulk = async (newInfoLines) => {
        const updatedData = await DeviceInfo.bulkCreate(newInfoLines);
        return { updatedData };
    }
}
module.exports = new InfoService();