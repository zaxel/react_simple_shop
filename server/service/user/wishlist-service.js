const WishItemsDto = require("../../dtos/whishitems-dto");
const WishListDto = require("../../dtos/whishlist-dto");
const { WishList, Device, Rate, Type, Brand } = require("../../models/models");

class WishlistService {
    get = async ({ userId }) => {
        const result = await WishList.findAndCountAll({ where: { userId } });
        result.rows = result.rows.map(el => new WishListDto(el));
        return result;
    }

    getItems = async ({ userId }) => {
        const result = await WishList.findAndCountAll({
            where: { userId },
            order: [['createdAt', 'DESC']],
            include: [{
                model: Device,
                required: true,
                attributes: ['id', 'name', 'price', 'img', 'rate'],
                include: [{
                    model: Type,
                    attributes: ['id', 'name'],
                },{
                    model: Brand,
                    attributes: ['id', 'name'],
                }],
            }],
        });

        if(result.count)
            result.rows = result.rows.map(el => new WishItemsDto(el));
        return result;
    }


    add = async ({ userId, deviceId }) => {
        const result = await WishList.create({ userId, deviceId });
        return new WishListDto(result);
    }

    delete = async ({ userId, deviceId }) => {
        const result = await WishList.destroy({
            where: { userId, deviceId }
        });
        return result;
    }

}

module.exports = new WishlistService();