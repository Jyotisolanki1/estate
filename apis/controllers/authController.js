import User from "../models/UserModel.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../until/error.js";
import jwt from 'jsonwebtoken';


export const signUp = async(req,res,next) =>{
     const {username,email,password} = req.body;
     const hashedPassword = bcryptjs.hashSync(password, 10);
     const newUser = new User({username,email,password:hashedPassword});
     try {
        await  newUser.save();
        res.status(201).json({'msg': "user created successfully"})
     } catch (error) {
        next(error)
     }
     
}


export const signIn = async(req,res,next) =>{
try {
   const {email,password}  = req.body;
   const isValidate = await User.findOne( { email } );
   if (!isValidate) return next(errorHandler(404,"User not found")); //unauthorized status code
   const validPassword  = await bcryptjs.compare(password, isValidate.password)
   if(!validPassword) return next(errorHandler(401,"wrong credentials"));
   const token = jwt.sign({id: isValidate._id },process.env.JWT_SECRET);
   const {password: pass , ...rest} =  isValidate._doc;
   res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest)
} catch (error) {
   next(error)
}
}