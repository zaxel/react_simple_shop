const { InfoAppCards } = require('../../models/models');
// const appDto = require('../../dtos/app-dto');

class AppService {
    create = async (name, title, text) => {
        // const page = await InfoAppCards.create({ name, title, text });
        // return page;
        console.log(66, name, title, text)



        // const data = await InfoAppCards.bulkCreate(types, {
        //     ignoreDuplicates: true,
        // });
        //bulkCreate returns id===null if type already exist in db.
        // return data.filter(type=> type.id);
    }
    getAll = async (sortBy = 'id', sortDirection = 'ASC') => {
        // let types = await Type.findAll({order: [
        //     [sortBy, sortDirection],
        // ]});
        // types = types.map(el=>new TypeDto(el))
        // return types;
    }



    // update = async (id, name) => {
    //     const updatedData = await Type.update({ name }, {
    //         where: { id }
    //       });
    //     return {updatedData};
    // }
    // delete = async (id) => {
    //     const updatedData = await Type.destroy({
    //         where: { id }
    //       });
    //     return {updatedData};
    // }
}

module.exports = new AppService();