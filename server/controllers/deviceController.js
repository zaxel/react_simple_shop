const uuid = require('uuid');
const path = require('path');
const { Op, Sequelize } = require("sequelize");
const { Device, DeviceInfo } = require('../models/models');
const ApiError = require('../error/ApiError');
const deviceService = require('../service/device/device-service');



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
    async getAll(req, res) {
        try {
            const startPage = process.env.START_PAGE;
            const defaultLimit = process.env.DEFAULT_LIMIT;
            let { id, brandId, typeId, limit, page } = req.query;
            const devices = await deviceService.getAll(id, brandId, typeId, limit, page, startPage, defaultLimit);
            return res.json(devices);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async getSingle(req, res) {
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

}

module.exports = new DeviceController();