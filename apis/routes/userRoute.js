import express from 'express';
import { updateUser ,deleteUser,getUserListings} from '../controllers/userController.js'
import { varifyToken } from '../until/varifyUser.js';

const router = express.Router();


router.post('/update/:id',varifyToken, updateUser);
router.delete('/delete/:id',varifyToken,deleteUser);
router.get('/listings/:id',varifyToken,getUserListings);

export default router;