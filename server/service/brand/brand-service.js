const {Brand} = require('../../models/models');

class BrandService {
    create = async (type) => {
        const data = await Brand.bulkCreate([{ name: type }], {
            ignoreDuplicates: true,
        });
        if (!data[0].id) throw new Error('this brand already exist!')
        return data[0];
    }
    getAll = async () => {
        const brands = await Brand.findAll();
        return brands;
    }
}

module.exports = new BrandService();