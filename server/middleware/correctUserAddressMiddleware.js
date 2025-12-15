const tokenService = require('../service/user/token-service');

module.exports = function (req, res, next){
    if(req.method === 'OPTIONS'){
        next();
    }
    try{
        const accessToken = req.headers.authorization?.split(' ')[1];  // Bearer
        const decodedData = tokenService.validateAccessToken(accessToken); 
        const {id} = decodedData; 
        const paramsId = req.params.userId;
        if(Number(id) !== Number(paramsId))
            return res.status(403).json({message: 'access denied.'});
        
        next();
    }catch(e){
        res.status(401).json({ message: 'Invalid token' });
    }
}