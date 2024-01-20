const {Brand} = require('../models/models');
const ApiError = require('../error/ApiError');
class BrandController{

    async create(req , res){
        const {name} = req.body;
    
        const brand = await Brand.create({name});

        return res.json(brand);
    }

    async getAll(req , res){
        const brands = await Brand.findAll();
        res.status(200).json(brands); 
    }

    async remove(req , res){
        const {id} = req.query;

        const currentBrand = await Brand.findOne({id});

    
        if(currentBrand){
              await currentBrand.destroy();
               
              res.status(200).json({message: "The brand is removed sucsess"}); 
        }else{
            return next(ApiError.badRequest('Something is going wrong.'));
        }
        
    }

}

module.exports = new BrandController();