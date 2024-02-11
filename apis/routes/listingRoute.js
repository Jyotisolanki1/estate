import { createListing } from "../controllers/listingController.js";
import express from 'express';
import { varifyToken } from "../until/varifyUser.js";
const router = express.Router();


router.post('/create',varifyToken, createListing);

export default router;