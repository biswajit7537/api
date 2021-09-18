import Joi from "joi";
import { REFRESH_JWT_SECRET } from "../../config";
import { RefreshToken, User } from "../../models";
import CustomErrorHandler from "../../services/customErrorHandler";
import JwtService from "../../services/JwtService";

const refreshController = {
   
    async refresh(req,res,next){

        // validate
        const refreshSchema = Joi.object({
            refresh_token : Joi.string().required()
        });

        const { error } = refreshSchema.validate(req.body);
        if (error) {

            return next(error);
        }

        // checking in database

        let refreshtoken;

        try{

            refreshtoken = await RefreshToken.findOne({token : req.body.refresh_token});
            if(!refreshtoken){

                return next(CustomErrorHandler.unAutherized('Invalid refresh token'));
            }

            let userId;

            try{
               
                const {_id} = await JwtService.verify(refreshtoken.token,REFRESH_JWT_SECRET);
                userId = _id;

            }catch(err){
                return next(CustomErrorHandler.unAutherized('Invalid refresh token'));
            }

            const user = await User.findOne({_id : userId});
            if(!user){
                return next(CustomErrorHandler.unAutherized('No user found!'));

            }

            // again generating tokens
            
            const access_token = JwtService.sign({_id : user._id});

            const refresh_token = JwtService.sign({_id:user._id},'1y',REFRESH_JWT_SECRET);

                // storing refress token into database

            await RefreshToken.create({token : refresh_token})

            res.json({access_token : access_token,refresh_token : refresh_token});


        }catch(error){

            return next(new Error('Something Went Wrong '+ error.message));
        }

    }  

}

export default refreshController;