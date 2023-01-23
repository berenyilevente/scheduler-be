import {
  getBookingLayoutController,
  postBookingLayoutController,
  getBookingLayoutByIdController,
  deleteInputFromBookingLayoutController,
  deleteBookingLayoutController,
} from '@/controllers';
import { ApiUrl } from '@/utils';
import express, { Router } from 'express';

const router: Router = express.Router();

export const getBookingLayoutRouter: Router = router.get(
  `/${ApiUrl.GetBookingLayout}`,
  getBookingLayoutController
);

export const getBookingLayoutByIdRouter: Router = router.get(
  `/${ApiUrl.GetBookingLayoutById}/:id`,
  getBookingLayoutByIdController
);

export const postBookingLayoutRouter: Router = router.post(
  `/${ApiUrl.PostBookingLayout}`,
  postBookingLayoutController
);

export const delteInputFromBookingLayoutRouter: Router = router.post(
  `/${ApiUrl.DeleteInputFromBookingLayout}`,
  deleteInputFromBookingLayoutController
);
export const deleteBookingLayoutRouter: Router = router.delete(
  `/${ApiUrl.DeleteBookingLayout}/:id`,
  deleteBookingLayoutController
);
