module.exports = class OrderDetailsDto{
    deviceId;
    name;
    device_amount;
    rate;
    price;
    orderId;

    constructor(model){
        const {orderId, device, orderDevices } = model;
        this.orderId = orderId;
        this.deviceId = device.id;
        this.name = device.name;
        this.device_amount = orderDevices.find(el=>el.deviceId===this.deviceId).device_amount;
        this.rate = device.rate;
        this.price = device.price;
    }
}