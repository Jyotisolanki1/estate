import Listing  from "../models/listingModel.js";
import { errorHandler } from "../until/error.js";

export const createListing = async(req,res,next)=>{

try {
    const listing = await Listing.create(req.body);
    console.log(listing)
    res.status(201).json(listing)
} catch (error) {
    next(error)
}
}

export const deleteListing = async(req,res,next) =>{
const listing = await Listing.findById( req.params.id);
if(!listing){
    return next(errorHandler(404,'listing is not found'))
}
if(req.user.id !== listing.userRef) return next(errorHandler(401,'you can only delete your own listing'));
try {
    await Listing.findByIdAndDelete(req.params.id);
    res.status(200).json("Listing Deleted Successfully")
} catch (error) {
    next(error)
}
}