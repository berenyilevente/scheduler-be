import {
  getUserController,
  userLoginController,
  userRegisterController,
} from '@/controllers';
import authMiddleware from '@/middleware/authMiddleware';
import { ApiUrl } from '@/utils';
import express, { Router } from 'express';

export const authRouter: Router = express.Router();

authRouter.post(`/${ApiUrl.Login}`, userLoginController);
authRouter.post(`/${ApiUrl.Register}`, userRegisterController);
authRouter.get(`/${ApiUrl.GetUser}/:id`, authMiddleware, getUserController);
