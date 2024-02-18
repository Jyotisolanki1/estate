import { createListing ,deleteListing,updateListing} from "../controllers/listingController.js";
import express from 'express';
import { varifyToken } from "../until/varifyUser.js";
const router = express.Router();


router.post('/create',varifyToken, createListing);
router.delete('/delete/:id',varifyToken,deleteListing);
router.post('/update/:id',varifyToken,updateListing)

export default router;