const uuid = require('uuid');
const path = require('path');
const { Op, Sequelize } = require("sequelize");
const { Device, DeviceInfo } = require('../models/models');
const ApiError = require('../error/ApiError');
const acceptedFileType = 'text/plain';
const startPage = 1;
const defaultLimit = 8;

class DeviceController {
    async create(req, res, next) {
        try {
            let { name, price, brandId, typeId, info } = req.body;
            let { img } = req.files;
            let fileName = uuid.v4() + ".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));

            const device = await Device.create({ name, price, brandId, typeId, img: fileName });
            if (info) {

                info = JSON.parse(info);
                info.forEach(i => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.descr,
                        deviceId: device.id
                    })
                });
            }
            return res.json(device);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }

    }

    async createBulk(req, res, next) {
        try {
            let { file } = req.files;
            if (file.mimetype !== acceptedFileType) throw new Error('unaccepted file type. must be .txt')
            const data = JSON.parse(file.data);

            const bulkPromises = data.map(el => {
                (async function () {
                    let { name, price, brandId, typeId, rate, img, info } = el;
                    const device = await Device.bulkCreate([{ name, price, brandId, typeId, rate, img }],
                        {
                            ignoreDuplicates: true,
                        });
                    if (info) {
                        if(!device[0].id) return;
                        info.forEach(i => {
                            DeviceInfo.create({
                                title: i.title,
                                description: i.description,
                                deviceId: device[0].id
                            })
                        });
                    }
                })()

            })
            let bulkItems = await Promise.all(bulkPromises);
            return res.json({ created_updated: data.length + ' devices' });
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }

    }

    async getAll(req, res) {
        let { id, brandId, typeId, limit, page } = req.query;
        page = page || startPage;
        limit = limit || defaultLimit;
        let offset = page * limit - limit;
        let devices;
        if (id) {
            devices = await Device.findAndCountAll({ where: { id: { [Op.or]: id } }, limit, offset });
            return res.json(devices);
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
        return res.json(devices);
    }
    async getSingle(req, res) {
        const { id } = req.params;
        const device = await Device.findOne({
            where: { id },
            include: [{ model: DeviceInfo, as: 'info' }]
        });
        return res.json(device);
    }

    async getRandom(req, res, next) {
        try {
            const {amount} = req.query;
            const devices = await Device.findAll({ order: Sequelize.literal('random()'), limit: amount }); 
            return res.json(devices);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }

}

module.exports = new DeviceController();