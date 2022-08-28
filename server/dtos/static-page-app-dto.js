module.exports = class AppDto {
    constructor(model){
        const {id, title, hero, link, app_button_img, app_button_dark_img, InfoPageId, updatedAt, createdAt} = model;
        if(id)this.id = model.id;
        if(hero)this.hero = model.hero;
        if(title) this.title = model.title;
        if(link) this.link = model.link;
        if(app_button_img) this.app_button_img = model.app_button_img;
        if(app_button_dark_img) this.app_button_dark_img = model.app_button_dark_img;
        if(InfoPageId) this.InfoPageId = model.InfoPageId;
        if(updatedAt) this.updatedAt = Date.parse(model.updatedAt);
        if(createdAt) this.createdAt = Date.parse(model.createdAt);
    }
}