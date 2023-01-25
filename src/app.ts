import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import { getInputRouter, postInputRouter, deleteInputRouter } from './routes';
import { ApiUrl } from './utils';
import bodyParser from 'body-parser';
import bookingLayoutRouter from './routes/booking-layout-router/BookingLayoutRouter';

dotenv.config();

const app = express();
const PORT: string | number = process.env.APP_PORT || 8000;
const MONGO_CONNECTION_URL: string = process.env.CONNECTION_URL || '';

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send('Welcome to scheduler API');
});
app.use(`/${ApiUrl.GetInput}`, getInputRouter);
app.use(`/${ApiUrl.PostInput}`, postInputRouter);
app.use(`/${ApiUrl.DeleteInput}`, deleteInputRouter);
app.use(`/`, bookingLayoutRouter);

mongoose
  .connect(MONGO_CONNECTION_URL)
  .then(() => app.listen(PORT, () => console.log(`server running: ${PORT}`)))
  .catch((error) => console.log(error.message));
9;
