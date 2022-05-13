const jwt = require('jsonwebtoken');
const { Token } = require('../../models/models');

class TokenService {
    generateJwt = (payload) => {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: '30m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {expiresIn: '30m'});
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
}

module.exports = new TokenService();