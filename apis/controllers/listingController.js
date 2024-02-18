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

export const updateListing = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id);
    console.log(listing)
    if (!listing) {
      return next(errorHandler(404, 'Listing not found!'));
    }
    if (req.user.id !== listing.userRef) {
      return next(errorHandler(401, 'You can only update your own listings!'));
    }
  
    try {
      // const updateListing = await Listing.findByIdAndUpdate(req.params.id,{
      //   $set:{
      //     name: req.body.name,
      //     description : req.body.description,
      //     address: req.body.address,
      //     regularPrice: req.body.regularPrice,
      //     discountPrice: req.body.discountPrice,
      //     bathrooms: req.body.bathrooms,
      //     bedrooms: req.body.bedrooms,
      //     furnished: req.body.furnished,
      //     parking: req.body.parking,
      //     type: req.body.type,
      //     offer: req.body.offer,
      //   }
      // },{new : true})
      const updatedListing = await Listing.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      console.log(updatedListing)
      res.status(200).json(updatedListing);
    } catch (error) {
      next(error);
    }
  };


export const getListing = async(req,res,next) =>{
  try {
    const listing = await Listing.findById(req.params.id);
    if(!listing) return next(errorHandler(404,"listing not found"));
    res.status(200).json(listing);
  } catch (error) {
    next(error)
  }
}
  