const ApiError = require('../error/ApiError');
const userService = require('../service/user/user-service');


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User, Basket} = require('../models/models');
const { validationResult } = require('express-validator');

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        {expiresIn: '10s'}
    );
}


class UserController {
    async registration(req, res, next){
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            const { email, password, role } = req.body;
            const userData = await userService.registration(email, password, role);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: process.env.AUTH_COOKIE_MAX_AGE, httpOnly: true});
            return res.json(userData);
        }catch(e){
            next(ApiError.badRequest(e.message + ': could not complete registration.'));
        } 



        
    }
    async login(req, res, next){
        try{
            const { email, password } = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: process.env.AUTH_COOKIE_MAX_AGE, httpOnly: true});
            return res.json(userData);
        }catch(e){
            next(ApiError.badRequest(e.message + ': could not complete login.'));
        }


        // const {email, password} = req.body;

        // const user = await User.findOne({where: {email}});
        // if(!user){
        //     return next(ApiError.unauthorized('wrong email or password(email)'));
        // }
        // let comparePasswords = bcrypt.compareSync(password, user.password);
        // if(!comparePasswords){
        //     return next(ApiError.unauthorized('wrong email or password(password)'));
        // }
        // const token = generateJwt(user.id, user.email, user.role);
        // return res.json({token});
    }

    async logout(req, res, next){
        try{
            const { refreshToken } = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        }catch(e){
            next(ApiError.badRequest(e.message + ': could not complete logout.'));
        }
    }
    async activate(req, res, next){
        try{
            
            const activationLink = req.params.link;
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URL);
        }catch(e){
            console.log(e)
            next(ApiError.badRequest(e.message + ': could not complete activation.'));
        }
    }

    async refresh(req, res, next){
        // try{

        // }catch(e){

        // }

        // const token = generateJwt(req.user.id, req.user.email, req.user.role);
        // res.json({token});
    }

}

module.exports = new UserController();