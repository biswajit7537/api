
import CustomErrorHandler from "../services/customErrorHandler";
import JwtService from "../services/JwtService";

const auth = async (req,res,next)=>{

    let authHeader = req.headers.authorization; 
   
    if(!authHeader){
        return next(CustomErrorHandler.unAutherized())
    }
   
    const token = authHeader.split(' ')[1];

    try{

    const {_id} = await JwtService.verify(token);
    const user = {_id};
    req.user = user;

    next();

    }catch(err){
        return next(CustomErrorHandler.unAutherized())
    }
}

export default auth;