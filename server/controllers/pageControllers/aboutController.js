const ApiError = require('../../error/ApiError');
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
    async updateCard(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            const { id, title, card_text, card_prev_text, button_id, infoPageId } = req.body;
            let hero = req?.files?.hero || null;
            const data = await aboutService.updateCard({ id, title, card_text, hero, card_prev_text, button_id, infoPageId });
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message)); 
        }
    }


    

    
    async getSingleCard(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            let { id } = req.params;
            const data = await aboutService.getSingleCard({ id }); 
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async getAllCards(req, res, next) {
        try {
            const data = await aboutService.getAllCards(); 
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async updateCardImg(req, res, next){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            let { id, imgDbCollName } = req.body;
            let img = req?.files?.img || null;
            const data = await aboutService.updateCardImg(id, img);
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }

    async deleteCard(req, res, next){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            const { id } = req.body;
            const data = await aboutService.deleteCard(id);
            return res.json(data);
        }catch(e){
            next(ApiError.badRequest(e.message + ': could not delete type.'));
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



    async updateBlock(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            const { id, title, text, button_id, infoAboutCardId } = req.body;
            let hero = req?.files?.hero || null;
            const data = await aboutService.updateBlock({ id, title, text, hero, button_id, infoAboutCardId });
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message)); 
        }
    }


    

    
    async getSingleBlock(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            let { id } = req.params;
            const data = await aboutService.getSingleBlock({ id }); 
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async getAllBlocks(req, res, next) {
        try {
            const data = await aboutService.getAllBlocks(); 
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async updateBlockImg(req, res, next){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            let { id, imgDbCollName } = req.body;
            let img = req?.files?.img || null;
            const data = await aboutService.updateBlockImg(id, img);
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }

    async deleteBlock(req, res, next){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            const { id } = req.body;
            const data = await aboutService.deleteBlock(id);
            return res.json(data);
        }catch(e){
            next(ApiError.badRequest(e.message + ': could not delete type.'));
        }
    }
}

module.exports = new AboutController();