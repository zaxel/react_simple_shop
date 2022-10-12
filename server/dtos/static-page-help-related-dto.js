module.exports = class HelpRelatedDto {
    constructor(model){
        const {id, faq_id, updatedAt, createdAt, infoHelpQuestionId} = model;
        if(id)this.id = model.id;
        if(faq_id)this.faq_id = model.faq_id;
        if(updatedAt) this.updatedAt = Date.parse(model.updatedAt);
        if(createdAt) this.createdAt = Date.parse(model.createdAt);
        if(infoHelpQuestionId)this.infoHelpQuestionId = model.infoHelpQuestionId;
    }
}