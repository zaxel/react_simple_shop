const isNumeric = require('./isNumeric');
const { Op } = require("sequelize");
module.exports = function searchOptions(searchBy, searchPrase) {
    let where = {};
    if (searchBy) {
        if (isNumeric(searchPrase)) {
            where[searchBy] = searchPrase;
        } else if (searchPrase === 'true') {
            where[searchBy] = true;

        } else if (searchPrase === 'false') {
            where[searchBy] = false;

        } else {
            where[searchBy] = { [Op.iLike]: `%${searchPrase}%` };
        }
    }
    return where;
}