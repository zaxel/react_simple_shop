const { InfoAboutCards, InfoAboutBlocks, InfoPages, ButtonLink } = require('../../models/models');
// const AboutDto = require('../../dtos/static-page-about-dto.js');
// const AboutBlockDto = require('../../dtos/static-page-about-block-dto.js');
// const AboutCardDto = require('../../dtos/static-page-about-card-dto.js');
// const AboutBtnDto = require('../../dtos/static-page-about-btn-dto.js');
const PageDto = require('../../dtos/static-page-dto.js');
const fileService = require("../file/file-service");
const { PageBtnsService, CardBtnService, BlockBtnService } = require("./about-btns-service");

class HelpService {
    // getChoosedBtns = async ({ id }) => {
    //     let btns = await ButtonLink.findAll({
    //         where: { id }
    //     });
    //     let buttons = btns.reduce((obj, btn) => {
    //         return { ...obj, [btn.id]: new AboutBtnDto(btn) }
    //     }, {});
    //     return buttons;
    // }
    // createCard = async ({ title, card_text, card_prev_text, hero, button_id, infoPageId }) => {
    //     let fileName = null;
    //     if (hero) {
    //         fileName = await fileService.imageResolve(hero);
    //     }

    //     let card = await InfoAboutCards.create({ title, card_text, card_prev_text, hero: fileName, button_id, infoPageId });
    //     card = new AboutDto(card);
    //     return card;
    // }


    getPage = async ({ name }) => {
        // let page = await InfoPages.findOne({
        //     where: { name },
        //     include: [{
        //         model: InfoAboutCards, as: 'info_about_cards'
        //     }]
        // });
        // const btnsNumbers = new PageBtnsService().getPageButtons(page);
        // const buttons = await this.getChoosedBtns({ id: btnsNumbers });
        // page = new AboutDto(page);

        // return { page, buttons };


    }
    
}

module.exports = new HelpService();