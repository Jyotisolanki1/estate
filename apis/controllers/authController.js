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
   if (!isValidate) return next(errorHandler(404,"User not found"));
   const validPassword  = await bcryptjs.compare(password, isValidate.password)
   if(!validPassword) return next(errorHandler(401,"wrong credentials"));
   const token = await jwt.sign({id: isValidate._id },process.env.JWT_SECRET);
   console.log(token)
   const {password: pass , ...rest} =  isValidate._doc;
   console.log("before")
    res.cookie('access_token', token, { httpOnly: true, sameSite: 'None', secure: true })
   console.log("after")
   res.status(200).json(rest)
} catch (error) {
   next(error)
}
}


export const google = async(req,res,next) =>{
try {
   console.log(req.body)
   const user = await User.findOne({email:req.body.email})
   console.log(user)
   if(user){
      const token = jwt.sign({id: user._id},process.env.JWT_SECRET);
      const {password:pass,...rest} = user._doc;
      console.log(rest)
      res.status(200)
      .json(rest)
      .cookie('access_token', token, { httpOnly: true, sameSite: 'None', secure: true });
   }else{
      const generatePass = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatePass,10);
      const newUser = new User({
         username: req.body.username.split(" ").join("").toLowerCase()+ Math.random().toString(36).slice(-4),
         password: hashedPassword,
         avatar : req.body.photo,
         email: req.body.email
      });
      await newUser.save();
      const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET);
      const {password: pass, ...rest} = newUser._doc;
      res.cookie('access_token', token, { httpOnly: true, sameSite: 'None', secure: true })
      .status(200)
      .json(rest)
   }
} catch (error) {
next(error)
}
   
}
