const ApiError = require('../error/ApiError');
const deviceService = require('../service/device/device-service');
const { validationResult } = require('express-validator');

class DeviceController {
    async create(req, res, next) {
        try {
            let { name, price, brandId, typeId, info, seller_dscr } = req.body;
            let images = req?.files || null;
            const device = await deviceService.create(name, price, brandId, typeId, info, images, seller_dscr);
            return res.json(device);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async createBulk(req, res, next) {
        try {
            const data = await deviceService.createBulk(req, next);
            return res.json({ created_updated: data.length + ' devices' });
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }

    }
    async getAll(req, res, next) {
        try {
            let { id, brandId, typeId, limit, page, sortBy, sortDirection, searchBy, searchPrase } = req.query;
            const devices = await deviceService.getAll(id, brandId, typeId, limit, page, sortBy, sortDirection, searchBy, searchPrase);
            return res.json(devices);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async getSingle(req, res, next) {
        try {
            const { id } = req.params;
            const device = await deviceService.getSingle(id);
            return res.json(device);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async getRandom(req, res, next) {
        try {
            const { amount } = req.query;
            const devices = await deviceService.getRandom(amount);
            return res.json(devices);
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
            const data = await deviceService.update(id, field, newData);
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async updateDeviceImg(req, res, next){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            let img = req?.files?.img || null;
            let { id, index } = req.body;
            const data = await deviceService.updateImg(id, index, img, next);  
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async createDeviceImg(req, res, next){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            let { itemId } = req.body;
            let images = req?.files || null;
            const data = await deviceService.createImg(itemId, images); 
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async deleteDeviceImg(req, res, next){
        
        try {
            const errors = validationResult(req); 
            if(!errors.isEmpty()){
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            let { deviceId, imgId } = req.body; 
            const data = await deviceService.deleteDevImg(deviceId, imgId, next);
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async delete(req, res, next){
        try{
            const { id } = req.body;
            const data = await deviceService.delete(id);
            return res.json(data);
        }catch(e){
            next(ApiError.badRequest(e.message + ': could not delete device.'));
        }
    }
}

module.exports = new DeviceController();