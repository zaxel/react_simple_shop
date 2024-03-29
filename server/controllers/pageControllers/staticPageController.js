﻿﻿const ApiError = require('../../error/ApiError');
const pageService = require('../../service/staticPages/page-service');
const { validationResult } = require('express-validator');

class StaticPageController {
    async create(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            const { name, title, text } = req.body;
            const data = await pageService.create({ name, title, text });
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async update(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            const { id } = req.body;
            const field = Object.keys(req.body)[1];
            const newData = req.body[field]; 
            const data = await pageService.update(id, field, newData);
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message)); 
        }
    }

    async imageUpdate(req, res, next) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            let { id, type } = req.body;
            let img = req?.files?.img || null;
            const requestedData = await pageService.updateImg(id, type, img);
            return res.json(requestedData);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }

    async getPage(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            let { id, name } = req.query;
            const data = await pageService.getPage({ id, name }); 
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }

}

module.exports = new StaticPageController();