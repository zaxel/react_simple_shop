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


    async createBulk(req, res, next) {
        try {
            // deviceId: 18, title: 'tester', description: 'some description'
            let newInfoLines = req.body;
            console.log(55, newInfoLines)
            const info = await infoService.createBulk(newInfoLines);
            return res.json(info); 
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
            let {id, title, description } = req.body;
            let field = null;
            let newData = title ?? description;
            if(title){
                field = 'title';
            }else if(description){
                field = 'description';
            }else{
                return next(ApiError.badRequest('update device error'));
            }
            const data = await infoService.update(id, field, newData);
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async delete(req, res, next){
        try{
            const { id } = req.body;
            const data = await infoService.delete(id);
            return res.json(data);
        }catch(e){
            next(ApiError.badRequest(e.message + ': could not delete device info.'));
        }
    }
}

module.exports = new DeviceInfoController();