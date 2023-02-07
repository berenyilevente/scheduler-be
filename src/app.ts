import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import { bookingLayoutRouter, authRouter } from '@/routes';
import { Request, Response, Express } from 'express';
import { bookingRouter } from './routes/booking-router/BookingRouter';

dotenv.config();

const app: Express = express();
const PORT: string | number = process.env.APP_PORT || 8000;
const MONGO_CONNECTION_URL: string = process.env.CONNECTION_URL || '';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to scheduler API');
});

app.use(`/`, bookingLayoutRouter);
app.use(`/`, authRouter);
app.use(`/`, bookingRouter);

mongoose
  .connect(MONGO_CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`server running: ${PORT}`)))
  .catch((error) => console.log(error.message));
9;
