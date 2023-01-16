import { getInputController, postInputController } from '@/controllers';
import express, { Router } from 'express';

const router: Router = express.Router();

export const getInputRouter: Router = router.get('/', getInputController);
export const postInputRouter: Router = router.post('/', postInputController);
