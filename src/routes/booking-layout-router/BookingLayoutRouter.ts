import {
  getBookingLayoutController,
  postBookingLayoutController,
  getBookingLayoutByIdController,
  deleteInputFromBookingLayoutController,
  deleteBookingLayoutController,
  patchBookingLayoutController,
} from '@/controllers';
import { ApiUrl } from '@/utils';
import express, { Router } from 'express';
import authMiddleware from '@/middleware/authMiddleware';

export const bookingLayoutRouter: Router = express.Router();

bookingLayoutRouter.get(
  `/${ApiUrl.GetBookingLayout}`,
  authMiddleware,
  getBookingLayoutController
);

bookingLayoutRouter.get(
  `/${ApiUrl.GetBookingLayoutById}/:id`,
  getBookingLayoutByIdController
);

bookingLayoutRouter.post(
  `/${ApiUrl.PostBookingLayout}`,
  authMiddleware,
  postBookingLayoutController
);

bookingLayoutRouter.post(
  `/${ApiUrl.DeleteInputFromBookingLayout}`,
  authMiddleware,
  deleteInputFromBookingLayoutController
);

bookingLayoutRouter.delete(
  `/${ApiUrl.DeleteBookingLayout}/:id`,
  authMiddleware,
  deleteBookingLayoutController
);

bookingLayoutRouter.patch(
  `/${ApiUrl.PatchBookingLayout}/:id`,
  authMiddleware,
  patchBookingLayoutController
);
