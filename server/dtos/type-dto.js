module.exports = class OrderDto {
    id;
    name;
    createdAt;
    updatedAt;

    constructor(model){
        const {id, name, createdAt, updatedAt} = model;
        this.id = id;
        this.name = name;
        this.createdAt = Date.parse(createdAt);
        this.updatedAt = Date.parse(updatedAt);
    }
}