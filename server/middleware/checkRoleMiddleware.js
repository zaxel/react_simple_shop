const jwt = require('jsonwebtoken');
const tokenService = require('../service/user/token-service');

module.exports = function (role){
    return function (req, res, next){
        if(req.method === 'OPTIONS'){
            next();
        }
        try{
            const accessToken = req.headers.authorization?.split(' ')[1];  // Bearer
            if(!accessToken){
                return res.status(401).json({message: 'user not authorized!(no token in header)'});
            }

            const decodedData = tokenService.validateAccessToken(accessToken); 
        console.log(78, decodedData.role);
            if(decodedData.role !== role){
                return res.status(401).json({message: 'access denied! you must have an ADMIN permissions to fulfill this request!'});
            }
            req.user = decodedData;
            next();




            // const decoded = jwt.verify(token, process.env.SECRET_KEY);
            // if(decoded.role !== role){
            //     return res.status(403).json({message: 'access denied! you must have an ADMIN permissions to fulfill this request!'})
            // }
            // req.user = decoded;
            // next();
        }catch(e){
            res.status(401).json({message: e.message});
        }
    }
} 


