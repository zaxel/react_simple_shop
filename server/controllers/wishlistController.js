const ApiError = require('../error/ApiError');
const wishlistService = require('../service/user/wishlist-service');

class WishlistController {
    async get(req, res, next){
        try {
            const { userId } = req.params;
            const wishlist = await wishlistService.get({userId});
            return res.json(wishlist);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async getItems(req, res, next){
        try {
            const { userId } = req.params;
            const wishlist = await wishlistService.getItems({userId});
            return res.json(wishlist);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async add(req, res, next){
        try {
            const { userId } = req.params;
            const { deviceId } = req.params;
            const wishlist = await wishlistService.add({userId, deviceId});
            return res.json(wishlist);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async delete(req, res, next){
        try {
            const { userId } = req.params;
            const { deviceId } = req.params;
            const resp = await wishlistService.delete({userId, deviceId});
            return res.json(resp);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }

}

module.exports = new WishlistController();