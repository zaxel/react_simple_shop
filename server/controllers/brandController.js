const ApiError = require('../error/ApiError');
const brandService = require('../service/brand/brand-service');
const { validationResult } = require('express-validator');

class BrandController {
    async create(req, res, next){
        try{
            const {brands} = req.body;
            const data = await brandService.create(brands);
            return res.json(data);
        }catch(e){
            next(ApiError.forbidden(e.message));
        }
    }
    async getAll(req, res){
        try{
            let { sortBy, sortDirection } = req.query;
            const brands = await brandService.getAll(sortBy, sortDirection);
            return res.json(brands)
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
            const data = await brandService.update(id, name);
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async delete(req, res, next){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            const { id } = req.body;
            const data = await brandService.delete(id);
            return res.json(data);
        }catch(e){
            next(ApiError.badRequest(e.message + ': could not delete brand.'));
        }
    }
}

module.exports = new BrandController();