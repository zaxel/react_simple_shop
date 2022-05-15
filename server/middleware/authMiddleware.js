const tokenService = require('../service/user/token-service');

module.exports = function (req, res, next){
    if(req.method === 'OPTIONS'){
        next();
    }
    try{
        const accessToken = req.headers.authorization?.split(' ')[1];  // Bearer
        if(!accessToken){
            return res.status(401).json({message: 'user not authorized!(no token in header)'});
        }
        const decodedData = tokenService.validateAccessToken(accessToken); 
        
        if(!decodedData){
            return res.status(401).json({message: 'user not authorized!(token could not be decoded)'});
        }
        req.user = decodedData;
        next();
    }catch(e){
        res.status(404).json({message: e.message});
    }
}