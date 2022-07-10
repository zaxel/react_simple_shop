const uuid = require('uuid');
const path = require('path');
const { Op, Sequelize } = require("sequelize");
const { Device, DeviceInfo } = require('../models/models');
const ApiError = require('../error/ApiError');
const deviceService = require('../service/device/device-service');
const infoService = require('../service/device/info-service');
const { validationResult } = require('express-validator');



class DeviceInfoController {
    
    

    async getInfo(req, res, next) {
        try {
            const { deviceId } = req.params;
            const {sortBy, sortDirection} = req.query;
            const info = await infoService.getInfo(deviceId, sortBy, sortDirection);
            return res.json(info);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }


    async create(req, res, next) {
        try {
            let { name, price, brandId, typeId, info } = req.body;
            let img = req?.files?.img || null;
            const device = await deviceService.create(name, price, brandId, typeId, info, img);
            return res.json(device);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }

    }
    async update(req, res, next){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                console.log(99)
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            let { id, typeId, brandId, name, price, rate } = req.body;
            console.log(req.body)

            let field = null;
            let newData = typeId ?? brandId ?? name ?? price ?? rate;
            if(typeId){
                field = 'typeId';
            }else if(brandId){
                field = 'brandId';
            }else if(name){
                field = 'name';
            }else if(price){
                field = 'price';
            }else if(rate){
                field = 'rate';
            }else{
                return next(ApiError.badRequest('update device error'));
            }
            const data = await deviceService.update(id, field, newData);
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }

}

module.exports = new DeviceInfoController();