const sequelize = require("../../db");
const { BasketDevice, Basket, Device, Type, Brand } = require('../../models/models');
class CartService {

    getCart = async (userId) => {
        const [cart] = await Basket.findOrCreate({ where: { userId } });
        return cart;
    }

    merge = async ({ items, userId }) => { 
        if (!Array.isArray(items) || !items.length)
            return;
        
        try {
            const cart = await this.getCart(userId);
            if (!cart)
                throw new Error('Cart not found'); 

            await sequelize.transaction(async (t) => {
                for (const entry of items) {
                    const { deviceId, device_amount } = entry;

                    if (!deviceId || !Number.isInteger(device_amount) || device_amount <= 0)
                        throw new Error(`Invalid cart item: ${JSON.stringify(entry)}`);

                    const [cartItem, created] =
                        await BasketDevice.findOrCreate({
                            where: {
                                basketId: cart.id,
                                deviceId
                            },
                            defaults: { device_amount },
                            transaction: t
                        });

                    if (!created) {
                        cartItem.device_amount += device_amount;
                        await cartItem.save({ transaction: t });
                    }
                }
            });

            return { merged: true };

        } catch (error) {
            console.error('ERROR in mergeGuestCart:', error);
            throw error;
        }
    };


    addItem = async ({ deviceId, quantity, userId }) => {
        if (!deviceId || !userId)
            throw new Error('deviceId and userId are required');

        if (quantity <= 0 || !Number.isInteger(quantity))
            throw new Error('quantity must be a positive integer');

        try {
            const cart = await this.getCart(userId);
            const item = await sequelize.transaction(async (t) => {

                const [cartItem, created] = await BasketDevice.findOrCreate({
                    where: { deviceId, basketId: cart.id },
                    defaults: { device_amount: quantity },
                    transaction: t
                });

                if (!created) {
                    cartItem.device_amount += quantity;
                    await cartItem.save({ transaction: t });
                }

                return cartItem;
            });

            const fullItem = await BasketDevice.findByPk(item.id, {
                include: [
                    {
                        model: Device,
                        include: [
                            { model: Type, as: 'type', attributes: ['id', 'name'] },
                            { model: Brand, as: 'brand', attributes: ['id', 'name'] },
                        ],
                    },
                ],
            });

            return fullItem;


        } catch (error) {
            console.error('ERROR in addItem:', error);
            console.error('Error stack:', error.stack);
            throw error;
        }
    }

    getAll = async ({ userId }) => {
        if (!userId)
            throw new Error('userId are required');
        try {
            const cart = await Basket.findOne({
                where: { userId },
                include: [
                    {
                        model: BasketDevice,
                        as: 'items',
                        include: [
                            {
                                model: Device,
                                include: [
                                    { model: Type, as: 'type', attributes: ['id', 'name'] },
                                    { model: Brand, as: 'brand', attributes: ['id', 'name'] },
                                ],
                            },
                        ],
                    },
                ],
            });

            return cart;

        } catch (error) {
            console.error('ERROR in getAll:', error);
            console.error('Error stack:', error.stack);
            throw error;
        }
    }

    updateQuantity = async ({ userId, itemId, quantity }) => {
        if (userId == null || itemId == null || quantity == null)
            throw new Error('userId, itemId and quantity are required');

        if (!Number.isInteger(quantity) || quantity < 0)
            throw new Error('quantity must be a non-negative integer');

        try {
            const cart = await this.getCart(userId);
            if (!cart)
                throw new Error('no cart found.');

            const [affected] = await BasketDevice.update(
                { device_amount: quantity },
                { where: { basketId: cart.id, deviceId: itemId } }
            )

            if (!affected)
                throw new Error('Basket item not found');


            return { basketId: cart.id, deviceId: itemId, quantity };
        } catch (error) {
            console.error('ERROR in update quantity:', error);
            console.error('Error stack:', error.stack);
            throw error;
        }
    }

    deleteItem = async ({ userId, itemId }) => {
        if (userId == null || itemId == null)
            throw new Error('userId and itemId are required');

        try {
            const cart = await this.getCart(userId);
            if (!cart)
                throw new Error('no cart found.');

            const affected = await BasketDevice.destroy({ where: { basketId: cart.id, deviceId: itemId } });

            if (!affected)
                throw new Error('Basket item not found');


            return { basketId: cart.id, deviceId: itemId, deleted: true };
        } catch (error) {
            console.error('ERROR in delete item:', error);
            console.error('Error stack:', error.stack);
            throw error;
        }

    }

    clearCart = async ({ userId }) => {
        if (userId == null)
            throw new Error('userId and itemId are required');

        try {
            const cart = await this.getCart(userId);
            if (!cart)
                throw new Error('no cart found.');

            const affected = await BasketDevice.destroy({
                where: { basketId: cart.id }
            });

            if (!affected)
                return { cleared: true, empty: true };

            return { cleared: true };
        } catch (error) {
            console.error('ERROR in clear cart:', error);
            console.error('Error stack:', error.stack);
            throw error;
        }
    }

    fromSnapshot = async ({ snapshot }) => {
        if (!snapshot || !snapshot.length) return [];

        try {
            const devices = await Device.findAll({
                where: { id: snapshot.map(i => i.deviceId) },
                include: [Brand, Type]
            });

            const snapshotMap = new Map(snapshot.map(s => ([s.deviceId, s])));
            return devices.map(device => {
                const snap = snapshotMap.get(device.id);
                return {
                    ...snap,
                    device
                }
            }
            );

        } catch (error) {
            console.error('ERROR in fromSnapshot:', error);
            console.error('Error stack:', error.stack);
            throw error;
        }
    }
}
module.exports = new CartService();