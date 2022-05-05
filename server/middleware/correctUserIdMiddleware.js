module.exports = function (req, res, next){
    if(req.method === 'OPTIONS'){
        next();
    }
    try{
        const { query, user } = req;
        if(+user.id !== +query.userId){
            return res.status(403).json({message: 'access denied. user id not corresponding with cart id.'});
        }
        next();
    }catch(e){
        res.status(403).json({message: e.message});
    }
}