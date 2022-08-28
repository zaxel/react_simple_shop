const ApiError = require('../error/ApiError');
const appService = require('../service/staticPages/app-service');
const pageService = require('../service/staticPages/page-service');
const { validationResult } = require('express-validator');

class AppController {
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
            const { id, name, title, text } = req.body;
            const data = await pageService.update({ id, name, title, text });
            return res.json(data);
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




    async createCard(req, res, next) {
        try {
            const { title, hero, link, app_button_img, app_button_dark_img, infoPageId } = req.body;
            const data = await appService.create({title, hero, link, app_button_img, app_button_dark_img, infoPageId});
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    

    // async delete(req, res, next){
    //     try{
    //         const errors = validationResult(req);
    //         if(!errors.isEmpty()){
    //             return next(ApiError.badRequest('validation error: ', errors.array()));
    //         }
    //         const { id } = req.body;
    //         const data = await typeService.delete(id);
    //         return res.json(data);
    //     }catch(e){
    //         next(ApiError.badRequest(e.message + ': could not delete type.'));
    //     }
    // }
}

module.exports = new AppController();