const { InfoAppCards, InfoPages } = require('../../models/models');
const AppDto = require('../../dtos/static-page-app-dto.js');
const PageDto = require('../../dtos/static-page-dto.js');

class AppService {
    create = async ({ title, hero, link, app_button_img, app_button_dark_img, infoPageId }) => {
        let card = await InfoAppCards.create({ title, hero, link, app_button_img, app_button_dark_img, infoPageId });
        card = new AppDto(card);
        return card;
    }

    update = async ({id, title, hero, link, app_button_img, app_button_dark_img, infoPageId }) => {
        let updatedData = await InfoAppCards.update({id, title, hero, link, app_button_img, app_button_dark_img, infoPageId }, {
            where: { id }
          });
        return updatedData;
    }
    
    getSingleCard = async ({ id }) => {
        let card = await InfoAppCards.findOne({
            where:  {id}
        });
        card = new AppDto(card);
        return card;
    }
    getAllCards = async () => {
        let cards = await InfoAppCards.findAll();
        cards = cards.map(el=> new AppDto(el));
        return cards;
    }
    getPage = async ({id}) => {
        let page = await InfoPages.findOne({
            where: { id },
            include: [{ model: InfoAppCards, as: 'info_app_cards' }]
        });
        // cards = cards.map(el=> new AppDto(el));
        page = new PageDto(page);
        return page;

        
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