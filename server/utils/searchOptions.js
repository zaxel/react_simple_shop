const isNumeric = require('./isNumeric');
const { Op, where } = require("sequelize");
const ApiError = require('../error/ApiError');

exports.searchUsersOptions = (searchBy, searchPhrase) => {
    let where = {};
    if (searchBy) {
        if (isNumeric(searchPhrase)&&searchBy==='id') {
            where[searchBy] = searchPhrase;
        } else if (searchPhrase === '') {
            where = null;
        }else if (searchPhrase === 'true') {
            where[searchBy] = true;

        } else if (searchPhrase === 'false') {
            where[searchBy] = false;

        } else {
            where[searchBy] = { [Op.iLike]: `%${searchPhrase}%` };
        }
    }
    return where;
}
exports.searchOrdersOptions = (searchBy, searchPhrase) => {
    let where = {};
    if (!searchBy) return where;
    if (!isNumeric(searchPhrase) && searchPhrase !== ''){
        throw ApiError.badRequest('request must be a number in string format!');
    } 
    if (searchPhrase === '') {
        where = null;
    }else{
        where[searchBy] = searchPhrase;
    }
    return where;
}
exports.searchDevicesOptions = (id, brandId, typeId, searchBy, searchPhrase) => {
    let where = {};
    if (searchBy) {
        const isNumber = isNumeric(searchPhrase); 
        if ((searchBy==='id' || searchBy==='price') && !isNumeric(searchPhrase)) throw ApiError.badRequest('request must be a number!');
        if (isNumber && searchBy==='id' || isNumber && searchBy==='price') {
            where[searchBy] = searchPhrase;
        } else if (searchPhrase === '') {
            where = null;
        } else {
            where[searchBy] = { [Op.iLike]: `%${searchPhrase}%` };
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