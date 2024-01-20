const {Type} = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController{

    async create(req , res){
        const {name} = req.body;
    
        const type = await Type.create({name});

        return res.json(type);
    }

    async getAll(req , res){
        const types = await Type.findAll();
        res.status(200).json(types);
    }

    async remove(req , res, next){
        const {id} = req.query;
       
        const currentType = await Type.findOne({id});
        if(currentType){
              await currentType.destroy();
               
                res.status(200).json({message: "The type is removed sucsess"}); 
        }else{
            return next(ApiError.badRequest('Something is going wrong.'));
        }
    
    }

}

module.exports = new TypeController();