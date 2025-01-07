module.exports = class HelpFaqAnsToQuestDto {
    constructor(model){
        const {faq} = model;
        if(faq?.id)this.id = model.faq.id;
        if(faq?.title) this.question = model.faq.title;
        if(faq?.updatedAt) this.questionUpdatedAt = Date.parse(model.faq.updatedAt);
        if(faq?.createdAt) this.questionCreatedAt = Date.parse(model.faq.createdAt);
        if(faq?.id)this.infoHelpAnswerId = model.faq.id;
        this.order_id = 0;
        this.infoHelpCategoryId = 0;
    }
}