import { BookingLayoutModel } from '@/models';
import { BookingLayoutArgs, getErrorMessage } from '@/utils';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

export const getBookingLayoutController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log('ran');

    const bookingLayouts: BookingLayoutArgs[] = await BookingLayoutModel.find();
    res.status(200).json(bookingLayouts);
  } catch (error: any) {
    res.status(404).json({ message: getErrorMessage(error) });
  }
};

export const getBookingLayoutByIdController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const bookingLayout = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).send('No booking layouts with that id');
    }
    const bookingLayouts: BookingLayoutArgs[] | null =
      await BookingLayoutModel.findById(id, bookingLayout, { new: true });

    res.status(200).json(bookingLayouts);
  } catch (error: any) {
    res.status(404).json({ message: getErrorMessage(error) });
  }
};

export const postBookingLayoutController = async (
  req: Request,
  res: Response
): Promise<void> => {
  const bookingLayout = req.body;
  const newBookingLayout = new BookingLayoutModel(bookingLayout);

  try {
    await newBookingLayout.save();
    res.status(201).json(newBookingLayout);
  } catch (error) {
    res.status(209).json({ message: getErrorMessage(error) });
  }
};
