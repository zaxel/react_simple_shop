const fileService = require("../file/file-service");
const { Device, DeviceInfo } = require('../../models/models');
const { Op, Sequelize } = require("sequelize");
const acceptedFileType = 'text/plain';

class DeviceService {
    create = async (name, price, brandId, typeId, info, img) => {
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
    getAll = async (id, brandId, typeId, limit, page, startPage, defaultLimit) => {
        
        page = page || startPage;
        limit = limit || defaultLimit;
        let offset = page * limit - limit;
        let devices;
        if (id) {
            devices = await Device.findAndCountAll({ where: { id: { [Op.or]: id } }, limit, offset });
            return devices;
        }
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({ limit, offset });
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({ where: { brandId }, limit, offset });

        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { typeId }, limit, offset });
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { brandId, typeId }, limit, offset });
        }
        return devices;
    }
    getSingle = async (id) => {
        const device = await Device.findOne({
            where: { id },
            include: [{ model: DeviceInfo, as: 'info' }]
        });
        return device;
    }
    getRandom = async (amount) => {
        const devices = await Device.findAll({ order: Sequelize.literal('random()'), limit: amount }); 
        return devices;
    }
}
module.exports = new DeviceService();