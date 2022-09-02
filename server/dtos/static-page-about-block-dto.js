module.exports = class AboutBlockDto {
    constructor(model){
        const {id, title, text, button_id, infoAboutCardId, hero, updatedAt, createdAt} = model;
        if(id)this.id = model.id;
        if(title) this.title = model.title;
        if(text) this.text = model.text;
        if(hero)this.hero = model.hero;
        if(button_id) this.button_id = model.button_id;
        if(infoAboutCardId) this.infoAboutCardId = model.infoAboutCardId;
        if(updatedAt) this.updatedAt = Date.parse(model.updatedAt);
        if(createdAt) this.createdAt = Date.parse(model.createdAt);
    }
}