const { Order, OrderDevice, BasketDevice, User, Device, Basket, OrderAddress } = require('../../models/models');
const stripe = require('stripe')(process.env.STRIPE_SERVER_KEY);

const { Op } = require("sequelize");
const OrderDto = require('../../dtos/order-dto');
const { searchOrdersOptions } = require('../../utils/searchOptions');
const sequelize = require('../../db');

class OrderService {
    create = async (order, basketId, id) => {
        const newOrder = await Order.create({ userId: id });
        const ordersData = order.map(el => {
            return { device_amount: el.amount, deviceId: el.deviceId, orderId: newOrder.id };
        })
        const orderDevice = await OrderDevice.bulkCreate(ordersData);
        const deletedAmount = await BasketDevice.destroy({
            where: { basketId }
        });
        return orderDevice;
    }

    getAll = async (sortBy, sortDirection = 'ASC', limit, page, searchBy, searchPhrase) => {
        const startPage = process.env.START_ADMIN_ORDER_PAGE;
        const defaultLimit = process.env.DEFAULT_ADMIN_ORDER_LIMIT;
        page = page || startPage;
        limit = limit || defaultLimit;
        let offset = page * limit - limit;
        let where = searchOrdersOptions(searchBy, searchPhrase);
        let ordersGeneral = await Order.findAndCountAll({
            where,
            order: [
                [sortBy, sortDirection],
            ], limit, offset
        });
        const ordersIds = ordersGeneral.rows.map(el => ({ orderId: el.id }));
        const usersIds = ordersGeneral.rows.map(el => ({ id: el.userId }));
        let ordersDetails = await OrderDevice.findAll({
            where: {
                [Op.or]: ordersIds
            }
        });
        const devicesIds = ordersDetails.map(el => ({ id: el.deviceId }));
        const devicesInOrder = await Device.findAndCountAll({
            where: {
                [Op.or]: devicesIds
            }
        });

        const ordersPricesTable = {};
        devicesInOrder.rows.forEach(el => (ordersPricesTable[el.id] = el.price));

        let users = await User.findAll({
            where: {
                [Op.or]: usersIds
            }
        });
        const orders = {
            count: ordersGeneral.count,
            rows: ordersGeneral.rows.map(order => new OrderDto({ order, ordersDetails, users, ordersPricesTable }))
        }
        return orders;
    }

    delete = async (id) => {
        const updatedData = await Order.destroy({
            where: { id }
        });
        return { updatedData };
    }
    
    getHistory = async ({userId, sortBy, sortDirection = 'ASC', limit, page, searchBy, searchPhrase}) => {
        const startPage = process.env.START_ADMIN_ORDER_PAGE;
        const defaultLimit = process.env.DEFAULT_ADMIN_ORDER_LIMIT;
        page = page || startPage;
        limit = limit || defaultLimit;
        let offset = page * limit - limit;
        let where = searchOrdersOptions(searchBy, searchPhrase);

        let orders = await Order.findAndCountAll({
            where: {userId},
            order: [
                [sortBy, sortDirection],
            ], limit, offset
        });
        return orders ;
    }

    checkout = async (userId, address) => {
        const shippingFee = 1000; // $10.00
        const discount = 10; //%
        const couponId = "yyODR2Jm";

        if (!userId)
            throw new Error('User not authenticated');

        if (!address)
            throw new Error('Address is required');
        if (!address.street || !address.city || !address.house)
            throw new Error('Invalid address');

        try {
            return await sequelize.transaction(async (t) => {
                /* 1️⃣ Load cart */
                const cart = await Basket.findOne({
                    where: { userId },
                    transaction: t,
                    lock: t.LOCK.UPDATE,
                });

                if (!cart) throw new Error('Basket not found');

                await cart.reload({
                    include: [{
                        model: BasketDevice,
                        as: 'items',
                        include: [Device],
                    }],
                    transaction: t,
                });

                if (!cart.items.length)
                    throw new Error('Cart is empty');

                /* 2️⃣ Calculate total (SERVER SIDE) */
                let total = 0;
                const orderItems = cart.items.map(item => {
                    const price = Math.round(item.device.price * 100); // cents

                    const subTotal = price * item.device_amount;
                    const disc = Math.round(subTotal * discount / 100);

                    total += subTotal - disc;

                    return {
                        deviceId: item.deviceId,
                        title: item.device.name,
                        price: item.device.price,
                        device_amount: item.device_amount,
                    };
                });
                
                if (total > 0){
                    total += shippingFee;
                    total /= 100; //dollars
                }

                /* 3️⃣ Create Order */
                const order = await Order.create({
                    userId,
                    status: 'PENDING',
                    total,
                }, { transaction: t });

                /* 4️⃣ Snapshot address */
                await OrderAddress.create({
                    orderId: order.id,
                    ...address,
                }, { transaction: t });

                /* 5️⃣ Snapshot items */
                await OrderDevice.bulkCreate(
                    orderItems.map(i => ({
                        orderId: order.id,
                        ...i,
                    })),
                    { transaction: t }
                );

                /* 6️⃣ Create Stripe session */
                const session = await stripe.checkout.sessions.create({
                    ui_mode: "custom",
                    mode: "payment",

                    line_items: orderItems.map(item => ({
                        price_data: {
                            product_data: {
                                name: item.title,
                            },
                            unit_amount: Math.round(item.price * 100),
                            currency: "usd",
                        },
                        quantity: item.device_amount,
                    })),
                    shipping_options: [
                        {
                            shipping_rate_data: {
                                type: "fixed_amount",
                                fixed_amount: {
                                    amount: shippingFee,
                                    currency: "usd",
                                },
                                display_name: "Standard shipping",
                                delivery_estimate: {
                                    minimum: { unit: "business_day", value: 3 },
                                    maximum: { unit: "business_day", value: 5 },
                                },
                            },
                        },
                    ],
                    discounts: [
                        {
                            coupon: couponId,
                        },
                    ],
                    return_url: `${process.env.CLIENT_URL}/#/order/complete?session_id={CHECKOUT_SESSION_ID}`,

                    payment_intent_data: {
                        metadata: {
                            orderId: order.id,
                            userId,
                        },
                    },

                });

                /* 7️⃣ Save Stripe session id */
                await order.update(
                    { stripeSessionId: session.id },
                    { transaction: t }
                );

                /* 8️⃣ Done */
                return {
                    orderId: order.id,
                    clientSecret: session.client_secret
                };
            });
        } catch (error) {
            console.error('CHECKOUT FAILED:', error);
            throw error;
        }
    };

    async handleCheckoutCompleted({ orderId, paymentIntentId }) {
        if (!orderId) throw new Error('Missing orderId');
        await sequelize.transaction(async (t) => {
            const order = await Order.findByPk(orderId, {
                transaction: t,
                lock: t.LOCK.UPDATE,
            });
            if (!order || order.status === 'PAID') return;

            const basket = await Basket.findOne({
                where: { userId: order.userId },
                transaction: t,
                lock: t.LOCK.UPDATE,
            });
            if (!basket) throw new Error('Basket not found');

            await order.update(
                {
                    status: 'PAID',
                    paidAt: new Date(),
                    paymentIntentId,
                },
                { transaction: t }
            );

            await BasketDevice.destroy({
                where: { basketId: basket.id },
                transaction: t,
            });
        });
    }

    async handleCheckoutFailed({ orderId, paymentIntentId, reason }) {
        if (!orderId || !paymentIntentId)
            throw new Error('Invalid Stripe metadata');

        try {
            await sequelize.transaction(async (t) => {
                const order = await Order.findByPk(orderId, {
                    transaction: t,
                    lock: t.LOCK.UPDATE,
                });

                if (!order || order.status === 'PAYMENT_FAILED' || order.status === 'PAID') return;

                await order.update(
                    { status: 'PAYMENT_FAILED' },
                    { transaction: t }
                );
            });
        } catch (error) {
            console.error('CHECKOUT FAILED:', error);
            throw error;
        }
    }
    
    async handleCheckoutExpired({ orderId, stripeSessionId }) {
        if (!orderId || !stripeSessionId)
            throw new Error('Invalid Stripe metadata');

        try {
            await sequelize.transaction(async (t) => {
                const order = await Order.findByPk(orderId, {
                    transaction: t,
                    lock: t.LOCK.UPDATE,
                });
                if (!order || order.status !== 'PENDING') return;

                await order.update(
                    { status: 'CANCELLED' },
                    { transaction: t }
                );
            });
        } catch (error) {
            console.error('CHECKOUT EXPIRED:', error);
            throw error;
        }
    }

    async resolveBySession({ stripeSessionId }) {
        const order = await Order.findOne({
            where: { stripeSessionId },
        });

        if (!order)
            return res.status(404).json({ message: 'Order not found' });

        return {
            orderId: order.id,
            status: order.status,
        };
    }
}

module.exports = new OrderService();