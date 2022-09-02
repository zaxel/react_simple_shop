const AboutCardDto = require('./static-page-about-card-dto.js');

module.exports = class AboutDto {
    constructor(model){
        const {id, name, title, img, text, link, button_id, updatedAt, createdAt, info_about_cards} = model;
        if(id)this.id = model.id;
        if(name)this.name = model.name;
        if(title) this.title = model.title;
        if(img) this.img = model.img;
        if(text) this.text = model.text;
        if(link) this.link = model.link;
        if(button_id) this.button_id = model.button_id;
        if(updatedAt) this.updatedAt = Date.parse(model.updatedAt);
        if(createdAt) this.createdAt = Date.parse(model.createdAt);
        // if(info_app_cards) this.info_app_cards = model.info_app_cards.map(el=> new AppDto(el));


        if(info_about_cards) this.info_about_cards = model.info_about_cards.map(el=> new AboutCardDto(el));
    }
    
}