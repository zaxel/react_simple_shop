const ApiError = require("../../error/ApiError");
const { User, Basket } = require('../../models/models');
const bcrypt = require('bcrypt');
const {v4: uuidv4} = require('uuid');
const mailService = require('./mail-service');
const tokenService = require('./token-service');
const UserDto = require('../../dtos/user-dto');

class UserService {
    registration = async (email, password, role) => {
        if (!email || !password) {
            throw ApiError.badRequest('email or password is incorrect.');
        }
        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            throw ApiError.badRequest('user with this email already exist.');
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({ email, password: hashPassword, role });

        const basket = await Basket.create({ userId: user.id });

        const activationLink = uuidv4();
        await mailService.sendActivationMail(email, `${process.env.API_URL}api/activate/${activationLink}`);
        
        const userDto = new UserDto(user); //email; id; role; isActivated;
        const tokens = tokenService.generateJwt({...userDto});

        await tokenService.saveTokenToDb(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }


}

module.exports = new UserService();