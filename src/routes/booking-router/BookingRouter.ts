import { ApiUrl } from '@/utils';
import express, { Router } from 'express';
import authMiddleware from '@/middleware/authMiddleware';
import {
  deleteBookingController,
  getBookingByIdController,
  getBookingsController,
  postBookingController,
} from '@/controllers/booking-controller/BookingController';

export const bookingRouter: Router = express.Router();

bookingRouter.get(
  `/${ApiUrl.GetBookings}`,
  authMiddleware,
  getBookingsController
);
bookingRouter.get(
  `/${ApiUrl.GetBookings}/:id`,
  authMiddleware,
  getBookingByIdController
);

bookingRouter.post(`/${ApiUrl.PostBooking}`, postBookingController);

bookingRouter.delete(
  `/${ApiUrl.DeleteBooking}/:id`,
  authMiddleware,
  deleteBookingController
);
