const ApiError = require('../error/ApiError');
const addressService = require('../service/user/address-service');
const { validationResult } = require('express-validator');

class AddressController {
    async get(req, res, next){
        try {
            const { userId } = req.params;
            const addresses = await addressService.get({userId});
            return res.json(addresses);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async add(req, res, next){
        try {
            const { userId } = req.params;
            const {id, street, house, apartment, city, postal_code, country, county, is_default } = req.body;
            const addresses = await addressService.add({ id, user_id: userId, street, house, apartment, city, postal_code, country, county, is_default });
            return res.json(addresses);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async update(req, res, next){
        try {
            const { addressId } = req.params;
            
            const newData = req.body;
            const resp = await addressService.update({ id: addressId, newData });
            return res.json(resp);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async delete(req, res, next){
        try {
            const { addressId } = req.params;
            const resp = await addressService.delete({ id: addressId});
            return res.json(resp);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }

    async setDefault(req, res, next){
        try {
            const { userId, addressId } = req.params;
             const resp = await addressService.setDefault({ id: addressId, user_id: userId });
            return res.json(resp);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    
    
    
}

module.exports = new AddressController();