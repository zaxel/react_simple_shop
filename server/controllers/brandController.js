const ApiError = require('../error/ApiError');
const brandService = require('../service/brand/brand-service');

class BrandController {
    async create(req, res, next){
        try{
            const {brand} = req.body;
            const data = await brandService.create(brand);
            return res.json(data);
        }catch(e){
            next(ApiError.forbidden(e.message));
        }
    }
    async getAll(req, res){
        try{
            const brands = await brandService.getAll();
            return res.json(brands)
        }catch(e){
            next(ApiError.forbidden(e.message));
        }
        
    }
    
}

module.exports = new BrandController();