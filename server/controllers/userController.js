const ApiError = require('../error/ApiError');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {User , Basket} = require('../models/models');


const generateJWT = (id , email ,  role)=>{
    return   jwt.sign({id , email ,role}, 
        process.env.SECRET_KEY, {expiresIn: '240h'} );
}

class UserController{

    async registration(req , res, next){
        
        const {email , password , role} = req.body;

        if(!email || !password){
            return next(ApiError.badRequest('Некоррекстный email или пароль'));
        }
        const candidate = await User.findOne({where:{email}});
        
        if( candidate && candidate.id){
            return next(ApiError.badRequest('Пользователь с таким Email уже существует'));
        }
       
        const hashPassword = await bcrypt.hash(password , 5 );
        
        const user = await User.create({email , password: hashPassword , role });
        
        const basket = await Basket.create({userId: user.id});

        const token = generateJWT(user.id , user.email , user.role)

        return res.json({token});    
    }

    async login(req , res, next){
    
        const {email , password} = req.body;
        const user =  await User.findOne({where:{email}}); 
        
        if(user){
            const comparePassword =  bcrypt.compareSync(password , user.password);//may use - bcrypt.compareSync or await bcrypt.compare
          
            if(!comparePassword){
                return next(ApiError.badRequest('Ошибка пароля. Введите пароль еще раз.'));
            }
            
            const token = generateJWT(user.id , user.email , user.role);
            return res.json({token});


        }
            return next(ApiError.internal('Пользователя с таким email не существует.'));


        

    
    }

    async check(req , res, next){
         
        const {id , email , role} = req.user;
        const token = generateJWT(id , email , role);
       
        return res.json({token});
    }

}

module.exports = new UserController();