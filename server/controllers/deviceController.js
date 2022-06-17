const uuid = require('uuid');
const path = require('path');
const { Op, Sequelize } = require("sequelize");
const { Device, DeviceInfo } = require('../models/models');
const ApiError = require('../error/ApiError');
const deviceService = require('../service/device/device-service');
const { validationResult } = require('express-validator');



class DeviceController {
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
    async createBulk(req, res, next) {
        try {
            const data = await deviceService.createBulk(req);
            return res.json({ created_updated: data.length + ' devices' });
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }

    }
    async getAll(req, res, next) {
        try {
            const startPage = process.env.START_PAGE;
            const defaultLimit = process.env.DEFAULT_LIMIT;
            let { id, brandId, typeId, limit, page, sortBy, sortDirection, searchBy, searchPrase } = req.query;
            const devices = await deviceService.getAll(id, brandId, typeId, limit, page, startPage, defaultLimit, sortBy, sortDirection, searchBy, searchPrase);
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
            console.log(88)
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            let { id, typeId, role, is_activated } = req.body;
            let field = null;
            let newData = typeId ?? role ?? is_activated;
            if(typeId){
                field = 'typeId';
            }else if(role){
                field = 'role';
            }else if(is_activated){
                field = 'is_activated';
            }else{
                return next(ApiError.badRequest('no required field in req body'));
            }
            const data = await deviceService.update(id, field, newData);
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }

}

module.exports = new DeviceController();