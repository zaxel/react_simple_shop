module.exports = class OrderDetailsDto{
    deviceId;
    name;
    device_amount;
    rate;
    price;
    orderId;
    brand;
    img;
    createdAt;
    
    constructor(model){
        const {orderId, device, orderDevices, brandRes, createdAt } = model;
        this.orderId = orderId;
        this.deviceId = device.id;
        this.name = device.name;
        this.device_amount = orderDevices.find(el=>el.deviceId===this.deviceId).device_amount;
        this.rate = device.rate;
        this.price = device.price;
        this.brand = brandRes.name;
        this.img = device.img?.[0]?.thumb?.url ?? "/";
        this.createdAt = Date.parse(createdAt);
    }
}