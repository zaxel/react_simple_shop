const { InfoAppCards, InfoPages } = require('../../models/models');
const PageDto = require('../../dtos/static-page-dto.js');

class PageService {
    create = async ({ name, title, img, text, link, button_id }) => {
        let page = await InfoPages.create({ name, title, img, text, link, button_id });
        page = new PageDto(page);
        return page;
    }
    update = async ({id, name, title, img, text, link, button_id }) => {
        let updatedData = await InfoPages.update({id, name, title, img, text, link, button_id }, {
            where: { id }
          });
        return updatedData; 
    }
    
    
    
    
    // delete = async (id) => {
        // const updatedData = await Type.destroy({
            // where: { id }
        //   });
        // return {updatedData};
    // }

    getAll = async (sortBy = 'id', sortDirection = 'ASC') => {
        // let types = await Type.findAll({order: [
        //     [sortBy, sortDirection],
        // ]});
        // types = types.map(el=>new TypeDto(el))
        // return types;
    }



    
}

module.exports = new PageService();