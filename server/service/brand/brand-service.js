const {Brand} = require('../../models/models');

class BrandService {
    create = async (brand) => {
        const data = await Brand.bulkCreate([{ name: brand }], {
            ignoreDuplicates: true,
        });
        if (!data[0].id) throw new Error('this brand already exist!')
        return data[0];
    }
    getAll = async () => {
        const brands = await Brand.findAll();
        return brands;
    }
    update = async (id, name) => {
        const updatedData = await Brand.update({ name }, {
            where: { id }
          });
        return {updatedData};
    }
    delete = async (id) => {
        const updatedData = await Brand.destroy({
            where: { id }
          });
        return {updatedData};
    }
}

module.exports = new BrandService();