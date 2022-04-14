const {Type} = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res, next){
        try{
            const {type} = req.body;
            const data = await Type.bulkCreate([{name: type}],{
                ignoreDuplicates: true,
            }); 
            if(!data[0].id) throw new Error('this type already exist!')
            return res.json(data[0]);
        }catch(e){
            next(ApiError.forbidden(e.message));
        }
    }
    async getAll(req, res){
        const types = await Type.findAll();
        return res.json(types)
    }
    
}

module.exports = new TypeController();