import express from 'express';

import { getDrivers, createRide, getRides } from '../controllers/service.js';

import auth_token from '../middlewares/auth_token.js';

const router = express.Router();

router.get('/all-drivers', auth_token, getDrivers);

router.post('/rides', auth_token, createRide);

router.get('/rides', auth_token, getRides);

export default router;
