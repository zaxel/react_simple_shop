const isNumeric = require('./isNumeric');
const { Op } = require("sequelize");
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