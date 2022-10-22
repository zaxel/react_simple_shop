const { InfoPages, InfoHelpQuestions, InfoHelpAnswers, InfoHelpCategories, InfoHelpRelatedQuestions,
    InfoHelpPopular } = require('../../models/models');
const { Op } = require("sequelize");
const fileService = require("../file/file-service");
const queryToString = require('../../utils/queryToString');
const PageDto = require('../../dtos/static-page-dto.js');
const HelpFaqDto = require('../../dtos/static-page-help-faq-dto');
const HelpCatDto = require('../../dtos/static-page-help-cat-dto');
const HelpRelatedDto = require('../../dtos/static-page-help-related-dto');
const HelpPopularDto = require('../../dtos/static-page-help-popular-dto');

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
        const questions = questionsData.map(el => new HelpFaqDto({ question: el }));
        const answers = answersData.map(el => new HelpFaqDto({ answer: el }));
        return { questions, answers };
    }
    getFaq = async ({id, faqName}) => {
        let question = null;
        if(id){
            const questionData = await InfoHelpQuestions.findOne({where: {id}});
            question = new HelpFaqDto({ question: questionData });
        }else{
            const query = (queryToString(faqName));
            const questionData = await InfoHelpQuestions.findOne({where: {
                question: {
                    [Op.iLike]: `${query}%`
                }
            }});
            question = new HelpFaqDto({ question: questionData });
        }
        let answersData = await InfoHelpAnswers.findOne({
            where: {id: question.infoHelpAnswerId}
        });
            const answer = new HelpFaqDto({ answer: answersData });
        return { question, answer };
    }
    getQuestion = async ({ categoryId, page, limit, categories }) => {
        const startPage = process.env.START_FAQS_PAGE;
        const defaultLimit = null;
        const sortBy = 'order_id';
        const sortDirection = 'ASC';
        let cat = null;
        let param = null;

        if (categoryId)
            param = { infoHelpCategoryId: categoryId };

        page = page || startPage;
        limit = limit || defaultLimit;
        let offset = page * limit - limit;

        if (categories) {
            cat = JSON.parse(categories);
            let questions = [];

            let faqs = await Promise.all(cat.map(async (faqId) => await InfoHelpQuestions.findAll({
                where: { infoHelpCategoryId: faqId },
                limit,
                offset,
                order: [
                    [sortBy, sortDirection],
                ]
            })
            ));

            faqs.forEach(categoryFaqs => {
                const currentFaqs = categoryFaqs.map(faq => {
                    return new HelpFaqDto({ question: faq })
                })
                questions = [...questions, ...currentFaqs]
            });
            return { questions };
        } else {
            let questionsData = await InfoHelpQuestions.findAndCountAll({
                where: param,
                limit,
                offset,
                order: [
                    [sortBy, sortDirection],
                ]
            });
            const questions = questionsData.rows.map(el => new HelpFaqDto({ question: el }));
            return { questions, count: questionsData.count };
        }
    }
    createFaq = async ({ question, answerTitle, answerText }) => {
        const answer = await InfoHelpAnswers.create({ title: answerTitle, text: answerText });
        question = await InfoHelpQuestions.create({ question, infoHelpAnswerId: answer.id });
        const faq = new HelpFaqDto({ answer, question });
        return faq;
    }
    updateQuestion = async ({ id, question, catNewFaqData }) => {
        const field = question ? { question } : { infoHelpCategoryId: catNewFaqData.infoHelpCategoryId, order_id: catNewFaqData.order_id }
        const updatedData = await InfoHelpQuestions.update(field, {
            where: { id }
        });
        return updatedData;
    }
    resetQuestionOrderByCatId = async ({ categoryId }) => {
        const updatedData = await InfoHelpQuestions.update({ order_id: null }, {
            where: { infoHelpCategoryId: categoryId }
        });
        return updatedData;
    }
    updateAnswer = async ({ id, text, title }) => {
        const field = text ? { text } : { title }

        const updatedData = await InfoHelpAnswers.update(field, {
            where: { id }
        });
        return updatedData;
    }
    deleteFaq = async ({ id }) => {
        const question = await InfoHelpQuestions.findOne({where: {infoHelpAnswerId: id}});

        const deletedQuestion = await InfoHelpQuestions.destroy({
            where: { infoHelpAnswerId: id }
        });
        const deletedAnswer = await InfoHelpAnswers.destroy({
            where: { id }
        });
        const deletedRelation = await InfoHelpRelatedQuestions.destroy({
            where: { faq_id: id }
        });

        const deletedPopular = await InfoHelpPopular.destroy({
            where: { infoHelpQuestionId: question.id }
        })

        return { deletedAnswer, deletedQuestion };
    }
    setFaqPosition = async ({ positions, categoryId }) => {
        const categories = await InfoHelpQuestions.bulkCreate(positions,
            {
                updateOnDuplicate: ["order_id"],
                where: { infoHelpCategoryId: categoryId }
            }
        );
        return categories;
    }

    getCategory = async ({ id }) => {
        let param = null;
        if (id) param = { id };
        let cat = await InfoHelpCategories.findAll({
            where: param
        })
        const data = cat.map(el => new HelpCatDto(el));
        return data;
    }
    createCategory = async ({ title, bannerData, iconData, link, order_id }) => {
        let banner = bannerData;
        let icon = iconData;
        if (banner)
            banner = await fileService.imageResolve(bannerData);
        if (icon)
            icon = await fileService.imageResolve(iconData);

        const cat = await InfoHelpCategories.create({ title, banner, icon, link, order_id });
        const data = new HelpCatDto(cat);
        return data;
    }
    setCategoryPosition = async ({ catPositions }) => {
        const categories = await InfoHelpCategories.bulkCreate(catPositions,
            {
                updateOnDuplicate: ["order_id"],
            }
        );
        return categories;
    }
    updateCategory = async ({ id, link, title }) => {
        const field = link ? { link } : { title }
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
        const updatedData = await InfoHelpCategories.update({ [imgDbCollName]: fileName }, {
            where: { id }
        });
        return { id, imgDbCollName, fileName };
    }
    deleteCategory = async ({ id }) => {
        const deletedCat = await InfoHelpCategories.destroy({
            where: { id }
        })
        return deletedCat;
    }

    getRelatedFaq = async ({ id }) => {
        const related = await InfoHelpRelatedQuestions.findAll({
            where: { faq_id: id }
        })
        const data = related.map(el => new HelpRelatedDto(el));
        return data;
    }
    addRelatedFaq = async ({ faq_id, infoHelpQuestionId }) => {
        const createdRelation = await InfoHelpRelatedQuestions.create({ faq_id, infoHelpQuestionId });
        const data = new HelpRelatedDto(createdRelation);
        return data;
    }
    delRelatedFaq = async ({ faq_id, infoHelpQuestionId }) => {
        const deletedRelation = await InfoHelpRelatedQuestions.destroy({
            where: { [Op.and]: [{ faq_id }, { infoHelpQuestionId }] }
        });
        return deletedRelation;
    }

    getPopular = async () => {
        let popularIdsData = await InfoHelpPopular.findAll();
        const id = popularIdsData.map(el => el.infoHelpQuestionId);
        const popularData = await InfoHelpQuestions.findAll({where: {id}})
        const popular = popularData.map(el => new HelpFaqDto({ question: el }));
        return { popular };
    }
    createPopular = async ({ infoHelpQuestionId }) => {
        const data = await InfoHelpPopular.create({ infoHelpQuestionId });
        const newPopular = new HelpPopularDto(data);
        return { newPopular };
    }
    deletePopular = async ({ id }) => {
        const deletedPopular = await InfoHelpPopular.destroy({
            where: { id }
        })
        return deletedPopular;
    }
}

module.exports = new HelpService();