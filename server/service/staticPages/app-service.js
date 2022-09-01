const { InfoAppCards, InfoPages } = require('../../models/models');
const AppDto = require('../../dtos/static-page-app-dto.js');
const PageDto = require('../../dtos/static-page-dto.js');
const fileService = require("../file/file-service");

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
    updateCardImg = async (id, img, imgDbCollName) => {
        if (!img) {
            throw new Error('No image received!')
        }
        console.log(id, imgDbCollName); 
        let fileName = await fileService.imageResolve(img);
        const updatedData = await InfoAppCards.update({ [imgDbCollName]: fileName }, {
            where: { id }
        });
        return { updatedData };
    }
    getPage = async ({name}) => {
        let page = await InfoPages.findOne({
            where: { name },
            include: [{ model: InfoAppCards, as: 'info_app_cards' }]
        });
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