const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, Basket} = require('../models/models');

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        {expiresIn: '2h'}
    );
}


class UserController {
    async registration(req, res, next){
        const {email, password, role} = req.body;
        if(!email || !password){
            return next(ApiError.badRequest('email or password is incorrect.'));
        }
        const candidate = await User.findOne({where: {email}});
        if(candidate){
            return next(ApiError.badRequest('user with this email already exist.'));
        }
        const hashPassword = await bcrypt.hash(password, 5);
        const user = await User.create({email, password: hashPassword, role});
        const basket = await Basket.create({userId: user.id});
        // const token = {test: 'test'};
        const token = generateJwt(user.id, user.email, user.role);
        return res.json({token});
    }
    async login(req, res){

    }
    async check(req, res, next){
        const {id} = req.query;
        if(!id){
            return next(ApiError.badRequest('no id stated.'));
        }
        res.json(id);
    }

}

module.exports = new UserController();