const AppDto = require('./static-page-app-dto.js');

module.exports = class PageDto {
    constructor(model){
        const {id, name, title, img, text, link, button_id, updatedAt, createdAt, info_app_cards} = model;
        if(id)this.id = model.id;
        if(name)this.name = model.name;
        if(title) this.title = model.title;
        if(img) this.img = model.img;
        if(text) this.text = model.text;
        if(link) this.link = model.link;
        if(button_id) this.button_id = model.button_id;
        if(updatedAt) this.updatedAt = Date.parse(model.updatedAt);
        if(createdAt) this.createdAt = Date.parse(model.createdAt);
        if(info_app_cards) this.info_app_cards = model.info_app_cards.map(el=> new AppDto(el));
    }
}