const uuid = require('uuid');
const path = require('path');
const {Device} = require('../models/models');
const ApiError = require('../error/ApiError');
const startPage = 1;
const defaultLimit = 9;

class DeviceController {
    async create(req, res, next){
        try{
            const {name, price, brandId, typeId, info} = req.body;
            const {img} = req.files;
            let fileName = uuid.v4()+".jpg";
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
    
            const device = await Device.create({name, price, brandId, typeId, img: fileName});
            return res.json(device);
        }catch(e){
            next(ApiError.badRequest(e.message));
        }
        
    }
    async getAll(req, res){
        let {brandId, typeId, limit, page} = req.query;
        page = page || startPage;
        limit = limit || defaultLimit;
        let offset = page * limit - limit;
        let devices;
        if(!brandId && !typeId){
            devices = await Device.findAndCountAll({limit, offset});
        }
        if(brandId && !typeId){
            devices = await Device.findAndCountAll({where:{brandId}, limit, offset});
        }
        if(!brandId && typeId){
            devices = await Device.findAndCountAll({where:{typeId}, limit, offset});
        }
        if(brandId && typeId){
            devices = await Device.findAndCountAll({where:{brandId, typeId}, limit, offset});
        }
        return res.json(devices);
    }
    async getSingle(req, res){

    }

}

module.exports = new DeviceController();