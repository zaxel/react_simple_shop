const fileService = require("../file/file-service");
const { Device, DeviceInfo } = require('../../models/models');
const { Op, Sequelize } = require("sequelize");
const acceptedFileType = 'text/plain';
const {searchDevicesOptions, orderDevicesOptions} = require('../../utils/searchOptions');
// const orderDevicesOptions = require('../../utils/searchOptions');

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
    getAll = async (id, brandId, typeId, limit, page, startPage, defaultLimit, sortBy, sortDirection = 'ASC', searchBy, searchPrase) => {
        page = page || startPage;
        limit = limit || defaultLimit;
        let offset = page * limit - limit;
        let where = searchDevicesOptions(id, brandId, typeId, searchBy, searchPrase);
        let order = orderDevicesOptions(sortBy, sortDirection);
        let devices = await Device.findAndCountAll({where, order, limit, offset });
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
    update = async (id, field, newData) => {
        const updatedData = await Device.update({ [field]: newData }, {
            where: { id }
          });
        return {updatedData};
    }



    updateImg = async (id, img) => {
        if(!img) {
            throw new Error('No image received!')
        }
        let fileName = await fileService.imageResolve(img);
        const updatedData = await Device.update({ 'img': fileName }, {
            where: { id }
          });
        return {updatedData};
    }
    delete = async (id) => {
        const updatedData = await Device.destroy({
            where: { id }
          });
        return {updatedData};
    }
}
module.exports = new DeviceService();