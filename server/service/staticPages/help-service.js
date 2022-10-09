const { InfoPages, InfoHelpQuestions, InfoHelpAnswers } = require('../../models/models');
// const AboutDto = require('../../dtos/static-page-about-dto.js');
// const AboutBlockDto = require('../../dtos/static-page-about-block-dto.js');
// const AboutCardDto = require('../../dtos/static-page-about-card-dto.js');
// const AboutBtnDto = require('../../dtos/static-page-about-btn-dto.js');
const PageDto = require('../../dtos/static-page-dto.js');
const HelpFaqDto = require('../../dtos/static-page-help-faq-dto');
const fileService = require("../file/file-service");

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
    createFaq = async ({ question, answerTitle, answerText }) => {

        const newAnswer = await InfoHelpAnswers.create({ title: answerTitle, text: answerText });
        const newQuestion = await InfoHelpQuestions.create({ question, infoHelpAnswerId: newAnswer.dataValues.id });
        const answer = newAnswer.dataValues;

        question = newQuestion.dataValues;
        const faq = new HelpFaqDto({answer, question});
        return faq; 
    }


    // getPage = async ({ name }) => {
    //     let page = await InfoPages.findOne({
    //         where: { name },
    //         include: [{
    //             model: InfoAboutCards, as: 'info_about_cards'
    //         }]
    //     });
    //     const btnsNumbers = new PageBtnsService().getPageButtons(page);
    //     const buttons = await this.getChoosedBtns({ id: btnsNumbers });
    //     page = new AboutDto(page);
    //     return { page, buttons };
    // }
    getPage = async ({ name }) => {
        let page = await InfoPages.findOne({
            where: { name }
        });
        page = new PageDto(page);
        return page;
    }
    
}

module.exports = new HelpService();