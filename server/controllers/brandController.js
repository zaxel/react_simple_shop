class BrandController {
    async create(req, res){
    }
    async getAll(req, res){
        res.json({mess: 'controllers working great'})

    }
    
}

module.exports = new BrandController();