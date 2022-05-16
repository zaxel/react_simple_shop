const ApiError = require('../error/ApiError');
const typeService = require('../service/type/type-service');

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
    async getAll(req, res){
        try{
            const types = await typeService.getAll();
            return res.json(types)
        }catch(e){
            next(ApiError.forbidden(e.message));
        }
        
    }
    
}

module.exports = new TypeController();