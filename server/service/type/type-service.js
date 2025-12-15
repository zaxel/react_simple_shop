const { Type } = require('../../models/models');
const TypeDto = require('../../dtos/type-dto');

class TypeService {
    create = async (types) => {
        const data = await Type.bulkCreate(types, {
            ignoreDuplicates: true,
        });
        //bulkCreate returns id===null if type already exist in db.
        return data.filter(type => type.id);
    }
    getAll = async (sortBy = 'id', sortDirection = 'ASC') => {
        let types = await Type.findAll({
            order: [
                [sortBy, sortDirection],
            ]
        });
        types = types.map(el => new TypeDto(el))
        return types;
    }
    get = async ({ id }) => {
        let type = await Type.findOne({
            where: { id }
        });
        return type;
    }
    update = async (id, name) => {
        const updatedData = await Type.update({ name }, {
            where: { id }
        });
        return { updatedData };
    }
    delete = async (id) => {
        const updatedData = await Type.destroy({
            where: { id }
        });
        return { updatedData };
    }
}

module.exports = new TypeService();