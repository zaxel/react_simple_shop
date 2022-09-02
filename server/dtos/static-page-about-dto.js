module.exports = class aboutDto {
    constructor(model){
        const {id, title, card_text, card_prev_text, hero, button_id, infoPageId, updatedAt, createdAt} = model;
        if(id)this.id = model.id;
        if(title) this.title = model.title;
        if(card_text) this.card_text = model.card_text;
        if(card_prev_text) this.card_prev_text = model.card_prev_text;
        if(hero)this.hero = model.hero;
        if(button_id) this.button_id = model.button_id;
        if(infoPageId) this.infoPageId = model.infoPageId;
        if(updatedAt) this.updatedAt = Date.parse(model.updatedAt);
        if(createdAt) this.createdAt = Date.parse(model.createdAt);
    }
}