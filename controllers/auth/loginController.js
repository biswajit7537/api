import Joi from "joi";
import { User,RefreshToken } from "../../models";
import bcrypt from "bcrypt";
import CustomErrorHandler from "../../services/customErrorHandler";
import JwtService from "../../services/JwtService";
import { REFRESH_JWT_SECRET } from "../../config";

const loginController = {

    async login(req, res, next) {
        // validation
        const loginSchema = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });

        const { error } = loginSchema.validate(req.body);
        if (error) {

            return next(error);
        }

        try {

            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return next(CustomErrorHandler.wrongCredentials())
            }

            // password compare

            const match = await bcrypt.compare(req.body.password, user.password);
            if (!match) {
                return next(CustomErrorHandler.wrongCredentials());
            }

            // token

            const access_token = JwtService.sign({_id : user._id});

            const refresh_token = JwtService.sign({_id:user._id},'1y',REFRESH_JWT_SECRET);

            // storing refress token into database

            await RefreshToken.create({token : refresh_token})

            res.json({access_token : access_token,refresh_token : refresh_token});

        } catch (err) {
            return next(err);
        }
    },

    async logout(req,res,next){

        // validation
        const refreshSchema = Joi.object({
            refresh_token : Joi.string().required()
        });
        
        console.log(req.body);

        const { error } = refreshSchema.validate(req.body);

        if (error) {

            return next(error);
        }

        try{
           
            await RefreshToken.deleteOne({token : req.body.refresh_token});

        }catch(err){

            return next(new Error('something went wrong in database'))
        }

        res.json({status : 1});
    }

};

export default loginController;