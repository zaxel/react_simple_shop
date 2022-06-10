const isNumeric = require('./isNumeric');
const { Op } = require("sequelize");
const ApiError = require('../error/ApiError');

module.exports = function searchUsersOptions(searchBy, searchPrase) {
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
module.exports = function searchOrdersOptions(searchBy, searchPrase) {
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