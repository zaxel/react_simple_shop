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
            return ApiError.badRequest('email or password is incorrect.');
        }
        const candidate = await User.findOne({ where: { email } });
        if (candidate) {
            return ApiError.badRequest('user with this email already exist.');
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const activationLink = uuidv4();
        const user = await User.create({ email, password: hashPassword, role, activation_link: activationLink });
        const basket = await Basket.create({ userId: user.id });
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/user/activate/${activationLink}`);
        const userDto = new UserDto(user); //email; id; role; isActivated;
        const tokens = tokenService.generateJwt({...userDto});
        await tokenService.saveTokenToDb(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }

    activate = async(activationLink) => {

        const user = await User.findOne({ where: { activation_link: activationLink } });

        if(!user){
            throw ApiError.badRequest('wrong activation link.');
        }
        user.is_activated = true;
        await user.save();
    }

    login = async(email, password) => {
        const user = await User.findOne({where: {email}});
        if(!user){
            return next(ApiError.unauthorized('wrong email or password(email)'));
        }
        let comparePasswords = await bcrypt.compareSync(password, user.password);
        if(!comparePasswords){
            return next(ApiError.unauthorized('wrong email or password(password)'));
        }
        const userDto = new UserDto(user); //email; id; role; isActivated;
        const tokens = tokenService.generateJwt({...userDto});
        await tokenService.saveTokenToDb(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }

    logout = async(refreshToken) => {
        const token = await tokenService.removeToken(refreshToken);
        return token;
    }
}

module.exports = new UserService();