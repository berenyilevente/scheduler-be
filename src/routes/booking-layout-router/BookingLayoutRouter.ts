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

const bookingLayoutRouter: Router = express.Router();

bookingLayoutRouter.get(
  `/${ApiUrl.GetBookingLayout}`,
  getBookingLayoutController
);

bookingLayoutRouter.get(
  `/${ApiUrl.GetBookingLayoutById}/:id`,
  getBookingLayoutByIdController
);

bookingLayoutRouter.post(
  `/${ApiUrl.PostBookingLayout}`,
  postBookingLayoutController
);

bookingLayoutRouter.post(
  `/${ApiUrl.DeleteInputFromBookingLayout}`,
  deleteInputFromBookingLayoutController
);
bookingLayoutRouter.delete(
  `/${ApiUrl.DeleteBookingLayout}/:id`,
  deleteBookingLayoutController
);

bookingLayoutRouter.patch(
  `/${ApiUrl.PatchBookingLayout}/:id`,
  patchBookingLayoutController
);

export default bookingLayoutRouter;
