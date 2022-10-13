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
            next(ApiError.badRequest(e.message + ': could not delete about card.'));
        }
    }



    async createBlock(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            const { title, text, button_id, infoAboutCardId } = req.body;
            let hero = req?.files?.img || null;
            let heroAlt = req?.files?.imgAlt || null;
            const data = await aboutService.createBlock({title, text, hero, heroAlt});
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
            const { id, title, text, button_id, infoAboutCardId, position } = req.body;
            let hero = req?.files?.hero || undefined;
            const data = await aboutService.updateBlock({ id, title, text, hero, button_id, infoAboutCardId, position });
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message)); 
        }
    }
    async updateBlocksPositions(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            const { positions } = req.body;
            const data = await aboutService.updateBlockPositions({ positions });
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
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
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
            let { id, index } = req.body;
            let img = req?.files?.img || null;
            const data = await aboutService.updateBlockImg({id, index, img});
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
    
    
    async createBtn(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            const { text, link } = req.body;
            const data = await aboutService.createBtn({text, link});
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async updateBtn(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            const { id, text, link } = req.body;
            const data = await aboutService.updateBtn({ id, text, link });
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message)); 
        }
    }
    async getChoosedBtns(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            let id = req.query.id.split(',');
            const data = await aboutService.getChoosedBtns({ id }); 
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async getAllBtns(req, res, next) {
        try {
            const data = await aboutService.getAllBtns(); 
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async deleteBtn(req, res, next){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            const { id } = req.body;
            const data = await aboutService.deleteBtn(id);
            return res.json(data);
        }catch(e){
            next(ApiError.badRequest(e.message + ': could not delete button.'));
        }
    }
}

module.exports = new AboutController();