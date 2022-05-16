const fileService = require("../file/file-service");
const { Device, DeviceInfo } = require('../../models/models');

class DeviceService {
    create = async (req) => {
        let { name, price, brandId, typeId, info } = req.body;
        let img = req?.files?.img || null;
        let fileName = 'no-image.jpg'
        if(img) {
            fileName = await fileService.imageResolve(img);
        }
        const device = await Device.create({ name, price, brandId, typeId, img: fileName });
        if (info) {
            this.createInfo(info, device.id);
        }
        return device;
    }
    createInfo = async(info, deviceId) => {
        if(!info)
            return new Error('no info received!')
        info = JSON.parse(info);
        info.forEach(i => {
            DeviceInfo.create({
                title: i.title,
                description: i.descr,
                deviceId
            })
        });
    }
}
module.exports = new DeviceService();