module.exports = class HelpCatDto {
    constructor(model){
        const {id, order_id, title, banner, icon, link, updatedAt, createdAt} = model;
        if(id)this.id = model.id;
        if(order_id)this.order_id = model.order_id;
        if(title) this.title = model.title;
        if(banner) this.banner = model.banner;
        if(icon) this.icon = model.icon;
        if(link) this.link = model.link;
        if(updatedAt) this.updatedAt = Date.parse(model.updatedAt);
        if(createdAt) this.createdAt = Date.parse(model.createdAt);
    }
}