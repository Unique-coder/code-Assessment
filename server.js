import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import { corsOptions } from './configs/corsOptions.js';
import { mongoDB } from './databases/mongoDB.js';
import { handleError, logger } from './middlewares/logEvents.js';

const app = express();
dotenv.config();

//Our access port. Changes when we deploy with heroku
const PORT = process.env.PORT || 6000;

// Access the routes by importing it into index.js
import service from './routes/service.js';
import user from './routes/user.js';

// middlewares
app.use(logger);
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.urlencoded({ limit: '30mb', extended: false }));
app.use(express.json({ limit: '30mb', extended: true }));

app.get('/', (req, res) => res.send('APP is running!'));
app.get('/routes', (req, res) => res.send('Routes are working well'));

// Set-up the starting route for all route in post.js
app.use('/api/user', user);
app.use('/api/service', service);

// mongoose connection
mongoDB();

app.use(handleError);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
