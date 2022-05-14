const jwt = require('jsonwebtoken');
const { Token } = require('../../models/models');

class TokenService {
    generateJwt = (payload) => {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: process.env.AUTH_ACCESS_TOKEN_MAX_AGE});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: process.env.AUTH_REFRESH_TOKEN_MAX_AGE});
        return {accessToken, refreshToken};
    }
    
    saveTokenToDb = async(userId, refreshToken) => {
        const tokenData = await Token.findOne({ where: { userId } });
        if (tokenData) {
            const token = await Token.update({refresh_token: refreshToken}, {where: { userId }});
            return token;
        }
        const token = await Token.create({userId, refresh_token: refreshToken});
        return token;
    }
    
    removeToken = async(refreshToken) => {
        const tokenData = await Token.destroy({
            where: {
                refresh_token: refreshToken
            }
        });
        return tokenData;
    }
}

module.exports = new TokenService();