import Listing  from "../models/listingModel.js";

export const createListing = async(req,res,next)=>{
try {
    const listing = Listing.create(req.body);
    res.status(201).json({
        message:true,
        listing
    })
} catch (error) {
    
}
}