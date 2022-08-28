const { InfoAppCards, InfoPages } = require('../../models/models');
const PageDto = require('../../dtos/static-page-dto.js');
const { Op } = require("sequelize");

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
    getPage = async ({ id, name }) => {
        const searchParams = (id && {id}) ?? (name && {name});
        let page = await InfoPages.findOne({
            where:  {...searchParams}
        });
        page = new PageDto(page);
        return page;
    }
    
    
    
    // delete = async (id) => {
        // const updatedData = await Type.destroy({
            // where: { id }
        //   });
        // return {updatedData};
    // }

    



    
}

module.exports = new PageService();