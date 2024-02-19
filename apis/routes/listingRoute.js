import { createListing ,deleteListing,updateListing,getListing} from "../controllers/listingController.js";
import express from 'express';
import { varifyToken } from "../until/varifyUser.js";
const router = express.Router();


router.post('/create',varifyToken, createListing);
router.delete('/delete/:id',varifyToken,deleteListing);
router.post('/update/:id',varifyToken,updateListing);
router.get('/get/:id',getListing)

export default router;