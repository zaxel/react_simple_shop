const ApiError = require('../error/ApiError');
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
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            const { id } = req.body;
            const field = Object.keys(req.body)[1];
            const newData = req.body[field]; 
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