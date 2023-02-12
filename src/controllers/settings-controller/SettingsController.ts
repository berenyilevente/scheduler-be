import { SettingsModel } from '@/models';
import { getErrorMessage } from '@/utils';
import { Request, Response } from 'express';

export const getWorkingHours = async (req: Request, res: Response) => {
  const workingHours: string[] = await SettingsModel.find();

  try {
    res.status(200).json(workingHours);
  } catch (error: any) {
    res.status(404).json({ message: getErrorMessage(error) });
  }
};

export const postWorkingHours = async (req: Request, res: Response) => {
  const workingHours: string[] = req.body;
  const setWorkingHours = new SettingsModel({ workingHours: workingHours });

  try {
    await setWorkingHours.save();
    res.status(201).json(setWorkingHours);
  } catch (error) {
    res.status(209).json({ message: getErrorMessage(error) });
  }
};
