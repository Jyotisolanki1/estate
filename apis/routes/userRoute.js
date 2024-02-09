import express from 'express';
import { updateUser } from '../controllers/userController.js'
import { varifyToken } from '../until/varifyUser.js';

const router = express.Router();


router.post('update/:id',varifyToken, updateUser);

export default router;