const jwt = require('jsonwebtoken');
const { Token } = require('../../models/models');
const ApiError = require("../../error/ApiError");

class TokenService {
    generateJwt = (payload) => {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: process.env.AUTH_ACCESS_TOKEN_MAX_AGE});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: process.env.AUTH_REFRESH_TOKEN_MAX_AGE});
        return {accessToken, refreshToken};
    }
    
    saveTokenToDb = async(userId, refreshToken) => {
        try{
            const tokenData = await Token.findOne({ where: { userId } });
            if (tokenData) {
                const token = await Token.update({refresh_token: refreshToken}, {where: { userId }});
                return token;
            }
            const token = await Token.create({userId, refresh_token: refreshToken});
            return token;
        }catch(e){
            console.log('--------------')
            console.log(e);
            console.log('--------------')
            return next(ApiError.badRequest(e.message + ': could not save token to db.'))
        }
        
    }
    
    removeToken = async(refreshToken) => {
        const tokenData = await Token.destroy({
            where: {
                refresh_token: refreshToken
            }
        });
        return tokenData;
    }

    
    validateAccessToken = (token) => {
        try{
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
            return userData;
        }catch(e){
            return null;
        }
    }

    validateRefreshToken = (token) => {
        try{
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
            return userData;
        }catch(e){
            return null;
        }
    }

    findToken = async(refreshToken) => {
        const tokenData = await Token.findOne({
            where: {
                refresh_token: refreshToken
            }
        });
        return tokenData;
    }
}

module.exports = new TokenService();