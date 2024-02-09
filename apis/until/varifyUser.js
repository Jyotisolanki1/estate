import jwt from "jsonwebtoken";
import { errorHandler } from "./error";

export const  varifyToken = (req,res,next) =>{
const token = res.cookies.access_token;
if(!token){
    return next(errorHandler(401,"Please Login to access this route"));
}else{
    jwt.verify(token,process.env.JWT_SECRET,(err,user)=>{
    if(err) return next(errorHandler(403,'forbidden'))
    req.user = user;
    next()
    })
}
}