import { ApiUrl } from '@/utils';
import express, { Router } from 'express';
import authMiddleware from '@/middleware/authMiddleware';
import {
  getWorkingHours,
  postWorkingHours,
} from '@/controllers/settings-controller/SettingsController';

export const settingsRouter: Router = express.Router();

settingsRouter.get(`/${ApiUrl.GetWorkingHours}`, getWorkingHours);
settingsRouter.post(
  `/${ApiUrl.PostWorkingHours}`,
  authMiddleware,
  postWorkingHours
);
