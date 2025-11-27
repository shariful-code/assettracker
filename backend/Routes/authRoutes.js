import { Router } from 'express';
import authController from '../Controller/authController.js';

const router = Router();

router.post('/signin', authController.login);
router.post('/signup', authController.signup);
router.post('/logout', authController.logout)


export default router;