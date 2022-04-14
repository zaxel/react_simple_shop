const {Brand} = require('../models/models');
const ApiError = require('../error/ApiError');


class BrandController {
    async create(req, res, next){
        try{
            const {brand} = req.body;
            const data = await Brand.bulkCreate([{name: brand}],{
                ignoreDuplicates: true,
            }); 
            if(!data[0].id) throw new Error('this brand already exist!')
            return res.json(data[0]);
        }catch(e){
            next(ApiError.forbidden(e.message));
        }
       
    }
    async getAll(req, res){
        const brands = await Brand.findAll();
        return res.json(brands)

    }
    
}

module.exports = new BrandController();