import { userLoginController, userRegisterController } from '@/controllers';
import { ApiUrl } from '@/utils';
import express, { Router } from 'express';

export const authRouter: Router = express.Router();

authRouter.post(`/${ApiUrl.Login}`, userLoginController);
authRouter.post(`/${ApiUrl.Register}`, userRegisterController);
