module.exports = class HelpPopularDto {
    constructor(model){
        const {id, updatedAt, createdAt, infoHelpQuestionId} = model;
        if(id)this.id = model.id;
        if(updatedAt) this.updatedAt = Date.parse(model.updatedAt);
        if(createdAt) this.createdAt = Date.parse(model.createdAt);
        if(infoHelpQuestionId)this.infoHelpQuestionId = model.infoHelpQuestionId;
    }
}