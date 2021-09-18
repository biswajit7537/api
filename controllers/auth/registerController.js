import Joi from "joi";
import CustomErrorHandler from "../../services/customErrorHandler";
import {RefreshToken, User} from "../../models";
import bcrypt from "bcrypt";
import JwtService from "../../services/JwtService";
import {REFRESH_JWT_SECRET} from "../../config";

const registerController = {
   async register(req,res,next){

        // validation
        const registerSchema = Joi.object({
            name : Joi.string().min(3).max(40).required(),
            email : Joi.string().email().required(),
            password : Joi.string().required(),
            repeat_password : Joi.ref('password')
        })
        
        const {error} = registerSchema.validate(req.body);

        if(error){
            return next(error);
        }

        try{
            const exist = await User.exists({email : req.body.email})
            if(exist){
                return next(CustomErrorHandler.alreadyExist("This email is already exist."))
            }

        }catch(err){
            return next(err);
        }
        
        const {name,email,password} = req.body;
        // hash password
         const hashedPassword = await bcrypt.hash(password,10);

         // model prepare
        
         const user = new User({
             name : name,
             email : email,
             password : hashedPassword

         })
         
         let access_token;
         let refresh_token;
         try{
            const result = await user.save();
            // token

            access_token = JwtService.sign({_id:result._id});
            refresh_token = JwtService.sign({_id:result._id},'1y',REFRESH_JWT_SECRET);

            // storing refress token into database

            await RefreshToken.create({token : refresh_token})

         }catch(err){

            return next(err);
         }


         
         res.json({access_token : access_token , refresh_token : refresh_token});  
    }
}

export default registerController;