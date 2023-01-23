import {
  getBookingLayoutController,
  postBookingLayoutController,
  getBookingLayoutByIdController,
} from '@/controllers';
import express, { Router } from 'express';

const router: Router = express.Router();

export const getBookingLayoutRouter: Router = router.get(
  '/',
  getBookingLayoutController
);

export const getBookingLayoutByIdRouter: Router = router.get(
  '/:id',
  getBookingLayoutByIdController
);

export const postBookingLayoutRouter: Router = router.post(
  '/',
  postBookingLayoutController
);
