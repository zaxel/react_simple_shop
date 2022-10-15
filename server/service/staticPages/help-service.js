const { InfoPages, InfoHelpQuestions, InfoHelpAnswers, InfoHelpCategories, InfoHelpRelatedQuestions } = require('../../models/models');
const { Op } = require("sequelize");
const fileService = require("../file/file-service");
const PageDto = require('../../dtos/static-page-dto.js');
const HelpFaqDto = require('../../dtos/static-page-help-faq-dto');
const HelpCatDto = require('../../dtos/static-page-help-cat-dto');
const HelpRelatedDto = require('../../dtos/static-page-help-related-dto');

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
    getQuestion = async () => {
        let questionsData = await InfoHelpQuestions.findAll();
        const questions = questionsData.map(el=>new HelpFaqDto({question: el}));
        return { questions };  
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
        const deletedRelation = await InfoHelpRelatedQuestions.destroy({
            where: { faq_id: id }
        });

        return {deletedAnswer, deletedQuestion};
    }
    
    getCategory = async ({id}) => {
        let param = null;
        if(id) param = {id}; 
        let cat = await InfoHelpCategories.findAll({
            where: param
        })
        const data = cat.map(el=>new HelpCatDto(el));
        return data;
    }
    createCategory = async ({ title, bannerData, iconData, link, order_id }) => {
        let banner = bannerData;
        let icon = iconData;
        if(banner)
            banner = await fileService.imageResolve(bannerData);
        if(icon)
            icon = await fileService.imageResolve(iconData);

        const cat = await InfoHelpCategories.create({ title, banner, icon, link, order_id });
        const data = new HelpCatDto(cat);
        return data; 
    }
    setCategoryPosition = async ({catPositions}) => {
        const categories = await InfoHelpCategories.bulkCreate(catPositions,
            {
                updateOnDuplicate: ["order_id"],
            }
        );
        return categories; 
    }
    updateCategory = async ({ id, link, title }) => {
        const field = link ? {link} : {title}
        const updatedData = await InfoHelpCategories.update(field, {
            where: { id }
        });
        return updatedData;
    }
    updateCatImg = async ({ id, imgDbCollName, img }) => {
        if (!img) {
            throw new Error('No image received!')
        }
        let fileName = await fileService.imageResolve(img);
        const updatedData = await InfoHelpCategories.update({[imgDbCollName]: fileName}, {
            where: { id }
        });
        return {id, imgDbCollName, fileName};
    }
    deleteCategory = async ({id}) => {
        const deletedCat = await InfoHelpCategories.destroy({
            where: { id }
        })
        return deletedCat; 
    } 






    
    getRelatedFaq = async ({id}) => {
        const related = await InfoHelpRelatedQuestions.findAll({
            where: {faq_id: id}
        })
        const data = related.map(el=>new HelpRelatedDto(el));
        return data;
    }
    addRelatedFaq = async ({faq_id, infoHelpQuestionId}) => {
        const createdRelation = await InfoHelpRelatedQuestions.create({faq_id, infoHelpQuestionId});
        const data = new HelpRelatedDto(createdRelation);
        return data;
    }
    delRelatedFaq = async ({faq_id, infoHelpQuestionId}) => {
        const deletedRelation = await InfoHelpRelatedQuestions.destroy({
            where: {[Op.and]: [{ faq_id }, { infoHelpQuestionId }]}
        });
        return deletedRelation;
    }
}

module.exports = new HelpService();