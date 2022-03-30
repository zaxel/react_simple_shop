const ApiError = require('../error/ApiError');

module.exports = function(err, req, res, next){
    if(err instanceof ApiError){
        console.log(err.status)
        return res.status(err.status).json({message: err.message});
    }
    return res.status(500).json({message: 'Error Unknown:' + err.message});
}