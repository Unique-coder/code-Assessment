import express from 'express';

import {
  register,
  login,
  forgotPassword,
  resetPassword,
  updatePassword,
} from '../controllers/Users.js';

import auth_token from '../middlewares/auth_token.js';
import isResetTokenValid from '../middlewares/userToken.js';

const router = express.Router();

router.post('/login', login);

router.post('/register', register);

router.patch('/change-password/:id', auth_token, updatePassword);

router.post('/forgot-password', forgotPassword);

router.post('/reset-password', isResetTokenValid, resetPassword);

export default router;
