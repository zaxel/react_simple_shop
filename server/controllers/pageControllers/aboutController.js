﻿const ApiError = require('../../error/ApiError');
const aboutService = require('../../service/staticPages/about-service');
const { validationResult } = require('express-validator');

class AboutController {
    async getPage(req, res, next) {
        try {
            const name = process.env.ABOUT_STATIC_PAGE;
            const data = await aboutService.getPage({name}); 
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async createCard(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            const { title, card_text, card_prev_text, button_id, infoPageId } = req.body;
            let hero = req?.files?.hero || null;
            const data = await aboutService.createCard({title, card_text, hero, card_prev_text, button_id, infoPageId});
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
            const { id, title, card_text, card_prev_text, button_id, infoPageId } = req.body;
            let hero = req?.files?.hero || null;
            const data = await aboutService.update({ id, title, card_text, hero, card_prev_text, button_id, infoPageId });
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message)); 
        }
    }


    async createBlock(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            const { title, text, button_id, infoAboutCardId } = req.body;
            let hero = req?.files?.hero || null;
            const data = await aboutService.createBlock({title, text, hero, button_id, infoAboutCardId});
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }

    
    // async getSingleCard(req, res, next) {
    //     try {
    //         const errors = validationResult(req);
    //         if (!errors.isEmpty()) {
    //             return next(ApiError.badRequest('validation error: ', errors.array()));
    //         }
    //         let { id } = req.params;
    //         const data = await appService.getSingleCard({ id }); 
    //         return res.json(data);
    //     } catch (e) {
    //         next(ApiError.forbidden(e.message));
    //     }
    // }
    // async getAllCards(req, res, next) {
    //     try {
    //         const data = await appService.getAllCards(); 
    //         return res.json(data);
    //     } catch (e) {
    //         next(ApiError.forbidden(e.message));
    //     }
    // }
    // async updateCardImg(req, res, next){
    //     try {
    //         const errors = validationResult(req);
    //         if(!errors.isEmpty()){
    //             return next(ApiError.badRequest('validation error: ', errors.array()));
    //         }
    //         let { id, imgDbCollName } = req.body;
    //         let img = req?.files?.img || null;
    //         const data = await appService.updateCardImg(id, img, imgDbCollName);
    //         return res.json(data);
    //     } catch (e) {
    //         next(ApiError.forbidden(e.message));
    //     }
    // }
    




    
    

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

module.exports = new AboutController();