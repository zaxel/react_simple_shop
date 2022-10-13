const ApiError = require('../../error/ApiError');
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
    async getQuestion(req, res, next) {
        try {
            const data = await helpService.getQuestion(); 
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

    
    async getCategory(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            let { id } = req.query;
            const data = await helpService.getCategory({id}); 
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async createCategory(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            const { title, banner, icon, link, order_id } = req.body;
            const bannerData = req?.files?.banner || null;
            const iconData = req?.files?.icon || null;
            const data = await helpService.createCategory({title, bannerData, iconData, link, order_id});
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message)); 
        }
    }
    async updateCategory(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            const { id, title, link } = req.body;
            const data = await helpService.updateCategory({id, title, link});
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message)); 
        }
    }
    async deleteCategory(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            const { id, catPositions } = req.body;
            const dataPosition = await helpService.setCategoryPosition({catPositions});
            const dataDeleted = await helpService.deleteCategory({id});  
            return res.json(dataDeleted);
        } catch (e) {
            next(ApiError.forbidden(e.message)); 
        }
    }
    
    async getRelated(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            let { id } = req.query;
            const data = await helpService.getRelatedFaq({id}); 
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async addRelated(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            let { faq_id, infoHelpQuestionId } = req.body;
            const data = await helpService.addRelatedFaq({faq_id, infoHelpQuestionId}); 
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async deleteRelated(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            let { faq_id, infoHelpQuestionId } = req.body;
            const data = await helpService.delRelatedFaq({faq_id, infoHelpQuestionId}); 
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
}

module.exports = new HelpController();