const ApiError = require('../error/ApiError');
const typeService = require('../service/type/type-service');
const { validationResult } = require('express-validator');

class TypeController {
    async create(req, res, next){
        try{
            const {type} = req.body;
            const data = await typeService.create(type);
            return res.json(data);
        }catch(e){
            next(ApiError.forbidden(e.message));
        }
    }
    async getAll(req, res, next){
        try{
            let { sortBy, sortDirection } = req.query;
            const types = await typeService.getAll(sortBy, sortDirection);
            return res.json(types)
        }catch(e){
            next(ApiError.forbidden(e.message));
        }
        
    }
    async update(req, res, next){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            const { id, name } = req.body;
            const data = await typeService.update(id, name);
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async delete(req, res, next){
        try{
            const { id } = req.body;
            const data = await typeService.delete(id);
            return res.json(data);
        }catch(e){
            next(ApiError.badRequest(e.message + ': could not delete type.'));
        }
    }
}

module.exports = new TypeController();