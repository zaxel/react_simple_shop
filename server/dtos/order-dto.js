module.exports = class OrderDto {
    id;
    createdAt;
    amountOrdered;
    userId;
    email;
    total;
    status;
    statusVariants = ["failed", "completed", "in progress"];

    constructor(model){
        const {order, ordersDetails, users, ordersPricesTable} = model;
        this.id = order.id;
        this.createdAt = Date.parse(order.createdAt);
        this.amountOrdered = ordersDetails.filter(el=>el.orderId===this.id).reduce((acc, next)=>acc+next.device_amount,0);
        this.total = ordersDetails.filter(el=>el.orderId===this.id).reduce((total, device)=>total + ordersPricesTable[device.deviceId]*device.device_amount,0);
        this.userId = order.userId;
        this.email = users.find(user=> user.id===this.userId).email;
        this.status = this.statusVariants[Math.floor(Math.random()*3)];
    }
}