const { InfoPages, InfoHelpQuestions, InfoHelpAnswers } = require('../../models/models');
// const AboutDto = require('../../dtos/static-page-about-dto.js');
// const AboutBlockDto = require('../../dtos/static-page-about-block-dto.js');
// const AboutCardDto = require('../../dtos/static-page-about-card-dto.js');
// const AboutBtnDto = require('../../dtos/static-page-about-btn-dto.js');
const PageDto = require('../../dtos/static-page-dto.js');
const HelpFaqDto = require('../../dtos/static-page-help-faq-dto');
const fileService = require("../file/file-service");

class HelpService {
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
    updateQuestion = async ({ id, question }) => {
        const updatedData = await InfoHelpQuestions.update({ question }, {
            where: { id }
        });
        return updatedData;
    }
    updateAnswer = async ({ id, text, title }) => {
        const field = text ? {text} : {title}

        const updatedData = await InfoHelpAnswers.update(field, {
            where: { id }
        });
        return updatedData;
    }
    deleteFaq = async ({ id }) => {
        const deletedQuestion = await InfoHelpQuestions.destroy({
            where: { infoHelpAnswerId: id }
        });
        const deletedAnswer = await InfoHelpAnswers.destroy({
            where: { id }
        });
        
        return {deletedAnswer, deletedQuestion};
    }
    
}

module.exports = new HelpService();