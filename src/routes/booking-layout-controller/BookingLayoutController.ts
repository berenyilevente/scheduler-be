import {
  getBookingLayoutController,
  postBookingLayoutController,
} from '@/controllers';
import express, { Router } from 'express';

const router: Router = express.Router();

export const getBookingLayoutRouter: Router = router.get(
  '/',
  getBookingLayoutController
);
export const postBookingLayoutRouter: Router = router.post(
  '/',
  postBookingLayoutController
);
