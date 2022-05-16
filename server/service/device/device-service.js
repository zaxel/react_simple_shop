const fileService = require("../file/file-service");
const { Device, DeviceInfo } = require('../../models/models');
const acceptedFileType = 'text/plain';

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
            info = JSON.parse(info);
            this.createInfo(info, device.id);
        }
        return device;
    }
    createInfo = async(info, deviceId) => {
        if(!info)
            return new Error('no info received!')
        info.forEach(i => {
            DeviceInfo.create({
                title: i.title,
                description: i.descr,
                deviceId
            })
        });
    }
    createBulk = async (req) => {
        let { file } = req.files;
        if (file.mimetype !== acceptedFileType) 
            throw new Error('unaccepted file type. must be .txt');
        const data = JSON.parse(file.data);
        let self = this;
        const bulkPromises = data.map(el => {
            (async function () {
                let { name, price, brandId, typeId, rate, img, info } = el;
                const device = await Device.bulkCreate([{ name, price, brandId, typeId, rate, img }],
                    {
                        ignoreDuplicates: true,
                    });
                if (info) {
                    if(!device[0].id) return;
                    self.createInfo(info, device[0].id);
                }
            })()

        })
        let bulkItems = await Promise.all(bulkPromises);
        return data;
    }
}
module.exports = new DeviceService();