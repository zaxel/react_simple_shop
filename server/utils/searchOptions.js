const isNumeric = require('./isNumeric');
const { Op, where } = require("sequelize");
const ApiError = require('../error/ApiError');

exports.searchUsersOptions = (searchBy, searchPrase) => {
    let where = {};
    if (searchBy) {
        if (isNumeric(searchPrase)&&searchBy==='id') {
            where[searchBy] = searchPrase;
        } else if (searchPrase === '') {
            where = null;
        }else if (searchPrase === 'true') {
            where[searchBy] = true;

        } else if (searchPrase === 'false') {
            where[searchBy] = false;

        } else {
            where[searchBy] = { [Op.iLike]: `%${searchPrase}%` };
        }
    }
    return where;
}
exports.searchOrdersOptions = (searchBy, searchPrase) => {
    let where = {};
    if (!searchBy) return where;
    if (!isNumeric(searchPrase) && searchPrase !== '') throw ApiError.badRequest('request must be a number!');
    if (searchPrase === '') {
        where = null;
    }else{
        where[searchBy] = searchPrase;
    }
    return where;
}
exports.searchDevicesOptions = (id, brandId, typeId, searchBy, searchPrase) => {
    let where = {};
    if (searchBy) {
        const isNumber = isNumeric(searchPrase); 
        if (isNumber && searchBy==='id' || isNumber && searchBy==='price') {
            where[searchBy] = searchPrase;
        } else if (searchPrase === '') {
            where = null;
        } else {
            where[searchBy] = { [Op.iLike]: `%${searchPrase}%` };
        }
        return where;
    }
    if (id) {
        where =  { id: { [Op.or]: id } };
        return where;
    }
    if (!brandId && !typeId) {
        return where;
    }
    if (brandId && !typeId) {
        where = { brandId };
        return where;
    }
    if (!brandId && typeId) {
        where = { typeId };
        return where;
    }
    if (brandId && typeId) {
        where = { brandId, typeId };
        return where;
    }
}
exports.orderDevicesOptions = (sortBy, sortDirection) => {
    let order;

    if (!sortBy) {
        return order = [];
    }
    return order = [
        [sortBy, sortDirection],
    ]
}
exports.orderInfoOptions = (sortBy, sortDirection) => {
    let description;

    if (!sortBy) {
        return description = [];
    }
    return description = [
        [sortBy, sortDirection],
    ]
}