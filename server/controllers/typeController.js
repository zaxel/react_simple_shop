const {Type} = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res){
        const {type} = req.body;
        const data = await Type.create({name: type}); 
        return res.json(data);
    }
    async getAll(req, res){
        const types = await Type.findAll();
        res.json(types)
    }
    
}

module.exports = new TypeController();