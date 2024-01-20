const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    
    if(req.method === 'OPTIONS'){
       return  next();
    }
    try {
       const token = req.headers.authorization.split(' ')[1];// Bearer tonen_is_here_alunlkjli.oujakljhlhiji.johkjhluyoiau  
        if(!token){
            return res.status(401).json({message: "Пользователь не автаризован!"});
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)  ;

        req.user = decoded;

        next();

    } catch (error) {
        
        return res.status(401).json({message: "Пользователь не автаризован!"});
    }
}

