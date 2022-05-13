const jwt = require('jsonwebtoken');

module.exports = function (req, res, next){
    if(req.method === 'OPTIONS'){
        next();
    }
    try{
        const token = req.headers.authorization?.split(' ')[1];  // Bearer
        console.log('authMiddleware', token)

        if(!token){
            return res.status(401).json({message: 'user not authorized!(no token in header)'});
        }
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded;
        next();
    }catch(e){
        res.status(404).json({message: e.message});
    }
}