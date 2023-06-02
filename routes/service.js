import express from 'express';

const router = express.Router();

router.get('/all-riders', riders);

router.post('/rides', createRide);

router.get('/rides', getRides);
