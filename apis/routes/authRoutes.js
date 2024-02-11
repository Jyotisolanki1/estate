import express from 'express';
import { signUp ,signIn,google, signout} from '../controllers/authController.js';

const router = express.Router();
router.post('/sign-up',signUp);
router.post('/sign-in',signIn);
router.post('/google',google);
router.get('/signout',signout)

export default router