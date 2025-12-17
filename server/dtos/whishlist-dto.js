module.exports = class WishListDto {
    id;
    userId;
    deviceId;
    createdAt;
    updatedAt;

    constructor(model){
        const {id, userId, deviceId, createdAt, updatedAt} = model;
        this.id = id;
        this.userId = userId;
        this.deviceId = deviceId;
        this.createdAt = Date.parse(createdAt);
        this.updatedAt = Date.parse(updatedAt);
    }
}