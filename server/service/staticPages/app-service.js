const { InfoAppCards } = require('../../models/models');
const appDto = require('../../dtos/static-page-app-dto.js');

class AppService {
    create = async ({ title, hero, link, app_button_img, app_button_dark_img, infoPageId }) => {
        let page = await InfoAppCards.create({ title, hero, link, app_button_img, app_button_dark_img, infoPageId });
        page = new appDto(page);
        return page;
    }


    // update = async ({id, name, title, img, text, link, button_id }) => {
    //     let updatedData = await InfoPages.update({id, name, title, img, text, link, button_id }, {
    //         where: { id }
    //       });
    //     return updatedData;
    // }
    // getPage = async ({ id, name }) => {
    //     const searchParams = (id && {id}) ?? (name && {name});
    //     let page = await InfoPages.findOne({
    //         where:  {...searchParams}
    //     });
    //     page = new PageDto(page);
    //     return page;
    // }



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