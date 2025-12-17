module.exports = class WishItemsDto {
    id;
    name;
    price;
    rate;
    img;
    type;
    brand;
    createdAt;
    updatedAt;

    constructor(model) {
        const { id, createdAt, updatedAt, device } = model;
        this.id = id;
        this.deviceId = device?.id || null;
        this.name = device?.name || null;
        this.price = device?.price || 0;
        this.rate = device?.rate || 0;
        this.img = device?.img?.[0]?.url || null;
        this.type = device?.type?.name || null;
        this.brand = device?.brand?.name || null;
        this.createdAt = Date.parse(createdAt);
        this.updatedAt = Date.parse(updatedAt);
    }
}