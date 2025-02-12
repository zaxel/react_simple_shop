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
    async getFaq(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            const { id } = req.query;
            const data = await helpService.getFaq({ id }); 
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async getSingleFaq(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors.array())
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            const { faqName } = req.params;
            const data = await helpService.getFaq({ faqName }); 
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
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            let { categoryId, page, limit, categories } = req.query;
            const data = await helpService.getQuestion({categoryId, page, limit, categories}); 
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
            const { id, question, catNewFaqData } = req.body;
            if(catNewFaqData?.positions?.length){
                const data = await helpService.setFaqPosition({ positions: catNewFaqData.positions, categoryId: catNewFaqData.fromCategoryId });
            }
            const data = await helpService.updateQuestion({ id, question, catNewFaqData }); 
            
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
    async changeFaqPosition(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            let { positions, categoryId } = req.body;
            const data = await helpService.setFaqPosition({ positions, categoryId });
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message)); 
        }
    }

    async getFaqSearch(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            let { searchPhrase, page, limit, categories } = req.query;
            const data = await helpService.getFaqSearch({searchPhrase, page, limit, categories}); 
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
                console.log(996, errors.array())
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
    async changeCategoryImg(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            let { id, imgDbCollName } = req.body;
            let img = req?.files?.img || null;
            const data = await helpService.updateCatImg({ id, imgDbCollName, img });
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message)); 
        }
    }
    async changeCatPosition(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            let { positions } = req.body;
            const data = await helpService.setCategoryPosition({ catPositions: positions });
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
            const resettedFaqCat = await helpService.resetQuestionOrderByCatId({categoryId: id});  
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

    async getPopular(req, res, next) {
        try {
            const data = await helpService.getPopular(); 
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async createPopular(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            const { id } = req.body;
            const data = await helpService.createPopular({infoHelpQuestionId: id});
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message)); 
        }
    }
}

module.exports = new HelpController();