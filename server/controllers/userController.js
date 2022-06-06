const ApiError = require('../error/ApiError');
const userService = require('../service/user/user-service');


const { validationResult } = require('express-validator');

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
            next(ApiError.badRequest(e.message + ': could not complete activation.'));
        }
    }

    async refresh(req, res, next){
        try{
            const { refreshToken } = req.cookies;

            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: process.env.AUTH_COOKIE_MAX_AGE, httpOnly: true});
            return res.json(userData);

        }catch(e){
            next(ApiError.badRequest(e.message + ': could not refresh tokens.'));
        }
    
    }

    async getAll(req, res, next){
        try {
            let { sortBy, sortDirection, limit, page, searchBy, searchPrase } = req.query;
            const users = await userService.getAll(sortBy, sortDirection, limit, page, searchBy, searchPrase);
            return res.json(users);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async update(req, res, next){
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.badRequest('validation error: ', errors.array()));
            }
            let { id, email, role, is_activated } = req.body;
            let field = null;
            let newData = email ?? role ?? is_activated;
            if(email){
                field = 'email';
            }else if(role){
                field = 'role';
            }else if(is_activated){
                field = 'is_activated';
            }else{
                return next(ApiError.badRequest('no required field in req body'));
            }
            const data = await userService.update(id, field, newData);
            return res.json(data);
        } catch (e) {
            next(ApiError.forbidden(e.message));
        }
    }
    async delete(req, res, next){
        try{
            const { id } = req.body;
            const data = await userService.delete(id);
            return res.json(data);
        }catch(e){
            next(ApiError.badRequest(e.message + ': could not delete user.'));
        }
    }
}

module.exports = new UserController();