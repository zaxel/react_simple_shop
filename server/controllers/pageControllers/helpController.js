﻿const ApiError = require('../../error/ApiError');
const helpService = require('../../service/staticPages/help-service');
const { validationResult } = require('express-validator');

class HelpController {
    async getPage(req, res, next) {
        try {
            const name = process.env.HELP_STATIC_PAGE;
            const data = await helpService.getPage({name}); 
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async getFaqs(req, res, next) {
        try {
            const data = await helpService.getFaqs(); 
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async createFaq(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            const { question, answerTitle, answerText } = req.body;
            const data = await helpService.createFaq({question, answerTitle, answerText});
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message)); 
        }
    }

    async updateFaqQuestion(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            const { id, question } = req.body;
            const data = await helpService.updateQuestion({ id, question });
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message)); 
        }
    }
    async updateFaqAnswer(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            const { id, text, title } = req.body;
            const data = await helpService.updateAnswer({ id, text, title });
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message)); 
        }
    }
    async deleteFaq(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            const { id } = req.body;
            const data = await helpService.deleteFaq({id});
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message)); 
        }
    }
    
}

module.exports = new HelpController();