const {Brand} = require('../../models/models');
const BrandDto = require('../../dtos/brand-dto');

class BrandService {
    create = async (brands) => {
        const data = await Brand.bulkCreate(brands, {
            ignoreDuplicates: true,
        });
        //bulkCreate returns id===null if type already exist in db.
        return data.filter(brand=> brand.id);
    }
    getAll = async (sortBy = 'id', sortDirection = 'ASC') => {
        let brands = await Brand.findAll({order: [
            [sortBy, sortDirection],
        ]});
        brands = brands.map(el=>new BrandDto(el))
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