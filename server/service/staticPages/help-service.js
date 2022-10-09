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
    


    
    getPage = async ({ name }) => {
        let page = await InfoPages.findOne({
            where: { name }
        });
        page = new PageDto(page);
        return page;
    }
    getFaqs = async () => {
        let questionsData = await InfoHelpQuestions.findAll();
        let answersData = await InfoHelpAnswers.findAll();
        const questions = questionsData.map(el=>new HelpFaqDto({question: el}));
        const answers = answersData.map(el=>new HelpFaqDto({answer: el}));
        return { questions, answers };  
    }
    createFaq = async ({ question, answerTitle, answerText }) => {
        const answer = await InfoHelpAnswers.create({ title: answerTitle, text: answerText });
        question = await InfoHelpQuestions.create({ question, infoHelpAnswerId: answer.id });
        const faq = new HelpFaqDto({answer, question});
        return faq; 
    }
}

module.exports = new HelpService();