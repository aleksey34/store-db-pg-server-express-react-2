const jwt = require('jsonwebtoken');
const { json } = require('sequelize');

module.exports = function(role){
   return function(req, res, next){
    if(req.method === 'OPTIONS'){
       return  next();
    }
    try {
       const token = req.headers.authorization.split(' ')[1];// Bearer tonen_is_here_alunlkjli.oujakljhlhiji.johkjhluyoiau  
        
       if(!token){
            return res.status(401).json({message: "Пользователь не автаризован!"});
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        

        if(decoded.role !== role){
            return res.status(403).json('Нет доступа')
        }



        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({message: "Ошибка авторизации!"});
    }
}
}
