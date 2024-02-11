import express from 'express';
import { updateUser ,deleteUser} from '../controllers/userController.js'
import { varifyToken } from '../until/varifyUser.js';

const router = express.Router();


router.post('/update/:id',varifyToken, updateUser);
router.delete('/delete/:id',varifyToken,deleteUser)

export default router;