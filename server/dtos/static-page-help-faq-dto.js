const AboutCardDto = require('./static-page-about-card-dto.js');

module.exports = class HelpFaqDto {
    constructor(model){
        const {answer, question} = model;
        if(answer.id)this.answerId = model.answer.id;
        if(answer.title) this.answerTitle = model.answer.title;
        if(answer.text) this.answerText = model.answer.text;
        if(answer.updatedAt) this.answerUpdatedAt = Date.parse(model.answer.updatedAt);
        if(answer.createdAt) this.answerCreatedAt = Date.parse(model.answer.createdAt);
        
        if(question.id)this.questionId = model.question.id;
        if(question.question) this.question = model.question.question;
        if(question.order_id)this.questionOrderId = model.question.order_id;
        if(question.updatedAt) this.questionUpdatedAt = Date.parse(model.question.updatedAt);
        if(question.createdAt) this.questionCreatedAt = Date.parse(model.question.createdAt);
        if(question.infoHelpCategoryId)this.questionCategoryId = model.question.infoHelpCategoryId;
        if(question.infoHelpAnswerId)this.questionAnswerId = model.question.infoHelpAnswerId;
    }
    
}