import { createListing ,deleteListing} from "../controllers/listingController.js";
import express from 'express';
import { varifyToken } from "../until/varifyUser.js";
const router = express.Router();


router.post('/create',varifyToken, createListing);
router.delete('/delete/:id',varifyToken,deleteListing)

export default router;