module.exports = class OrderDto {
    id;
    createdAt;
    amountOrdered;
    userId;
    email;

    constructor(model){
        const {order, ordersDetails, users} = model;
        this.id = order.id;
        this.createdAt = Date.parse(order.createdAt);
        this.amountOrdered = ordersDetails.filter(el=>el.orderId===this.id).reduce((acc, next)=>acc+next.device_amount,0);
        this.userId = order.userId;
        this.email = users.find(user=> user.id===this.userId).email;
    }
}