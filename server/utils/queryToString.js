const ApiError = require("../error/ApiError");

module.exports = function queryToString(query) {
    if(!query) throw ApiError.forbidden('query string could not be empty!');
    return query.toLowerCase().replace(/-/g, " ");
  }