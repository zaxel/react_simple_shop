const uuid = require('uuid');
const path = require('path');
const { Op } = require("sequelize");
const {Device, DeviceInfo} = require('../models/models');
const ApiError = require('../error/ApiError');
const startPage = 1;
const defaultLimit = 8;

class DeviceController {
    async create(req, res, next){
        try{
            let {name, price, brandId, typeId, info} = req.body;
            let {img} = req.files;
            let fileName = uuid.v4()+".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
    
            const device = await Device.create({name, price, brandId, typeId, img: fileName});
            if(info){
                
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
        }catch(e){
            next(ApiError.forbidden(e.message));
        }
        
    }
    async getAll(req, res){
        let {id, brandId, typeId, limit, page} = req.query;
        page = page || startPage;
        limit = limit || defaultLimit;
        let offset = page * limit - limit;
        let devices;
        if(id){
            devices = await Device.findAndCountAll({where:{id: {[Op.or]:id}}, limit, offset});
            return res.json(devices);
        }
        if(!brandId && !typeId){
            devices = await Device.findAndCountAll({limit, offset});
            console.log(55)
        }
        if(brandId && !typeId){
            devices = await Device.findAndCountAll({where:{brandId}, limit, offset});
            console.log(66)

        }
        if(!brandId && typeId){
            devices = await Device.findAndCountAll({where:{typeId}, limit, offset});
            console.log(77)
        }
        if(brandId && typeId){
            devices = await Device.findAndCountAll({where:{brandId, typeId}, limit, offset});
            console.log(88)
        }
        return res.json(devices);
    }
    async getSingle(req, res){
        const {id} =req.params;
        const device = await Device.findOne({
            where: {id},
            include: [{model: DeviceInfo, as: 'info'}]
        });
        return res.json(device);
    }

}

module.exports = new DeviceController();