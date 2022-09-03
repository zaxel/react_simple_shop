const AppDto = require('./static-page-app-dto.js');

module.exports = class AboutBtnDto {
    constructor(model){
        const {id, text, link, updatedAt, createdAt} = model;
        if(id)this.id = model.id;
        if(text) this.text = model.text;
        if(link) this.link = model.link;
        if(updatedAt) this.updatedAt = Date.parse(model.updatedAt);
        if(createdAt) this.createdAt = Date.parse(model.createdAt);
    }
}