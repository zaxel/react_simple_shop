const {Brand} = require('../models/models');
const ApiError = require('../error/ApiError');


class BrandController {
    async create(req, res){
        const {brand} = req.body;
        const data = await Brand.create({name: brand}); 
        return res.json(data);
    }
    async getAll(req, res){
        const brands = await Brand.findAll();
        res.json(brands)

    }
    
}

module.exports = new BrandController();