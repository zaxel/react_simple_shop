const {Type} = require('../../models/models');

class TypeService {
    create = async (type) => {
        const data = await Type.bulkCreate([{ name: type }], {
            ignoreDuplicates: true,
        });
        if (!data[0].id) throw new Error('this type already exist!')
        return data[0];
    }
    getAll = async () => {
        const types = await Type.findAll();
        return types;
    }
}

module.exports = new TypeService();