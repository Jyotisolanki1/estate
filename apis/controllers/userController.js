import { errorHandler } from "../until/error.js";
import User from '../models/UserModel.js'
import bcryptjs from 'bcryptjs';
import Listing from "../models/listingModel.js";

export const updateUser = async(req, res,next) =>{
if(req.user.id !== req.params.id) return next(errorHandler(401,'You are not allowed to perform this action')) 
try {
    if(req.body.password){
        req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    const updatedUser = await User.findByIdAndUpdate(req.params.id,{
        $set:{
            username:req.body.username,
            email: req.body.email,
            password: req.body.password,
            avatar : req.body.avatar
        }
    },{new:true});

    const {password:pass,...rest} = updatedUser._doc;
    res.status(200).json(rest)
} catch (error) {
    next(error)
}
};


export const deleteUser = async(req,res,next) =>{
    if(req.user._id != req.params.id) return next(errorHandler(403,"You can not delete other user account"));
    try {
        await  User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json({message:"Account has been deleted"});
    } catch (error) {
        next(error)
    }
}

export const getUserListings =async(req,res,next) =>{
   
        if(req.user.id === req.params.id){
         try {
            const listings  = await Listing.find({userRef : req.params.id});
            res.status(200).json(listings);
         } catch (error) {
            next(error)
         }
        }else{
         next(errorHandler("you can see only your own listing"))
        }
}

export const getUser = async(req,res,next) =>{
    try {
        const user = await User.findById(req.params.id);
        if(!user) return next(errorHandler(404,"User not found"));
        const {password: pass, ...rest} = user._doc;
        res.status(200).json(rest)
    } catch (error) {
        next(error)
    }
}