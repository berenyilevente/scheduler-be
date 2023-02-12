import { BookingModel } from '@/models';
import { Booking, getErrorMessage, InputType } from '@/utils';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

export const getBookingsController = async (req: Request, res: Response) => {
  const userId = req.body.userId;
  const bookings: Booking[] = await BookingModel.find({
    userId,
  });

  try {
    res.status(200).json(bookings);
  } catch (error: any) {
    res.status(404).json({ message: getErrorMessage(error) });
  }
};

export const getBookingByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No booking with that id');
  }

  const booking: Booking[] | null = await BookingModel.findById(id);

  try {
    res.status(200).json(booking);
  } catch (error: any) {
    res.status(404).json({ message: getErrorMessage(error) });
  }
};

export const postBookingController = async (req: Request, res: Response) => {
  const booking: Booking = req.body;
  const newBooking = new BookingModel(booking);

  try {
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (error) {
    res.status(209).json({ message: getErrorMessage(error) });
  }
};

export const deleteBookingController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (id === undefined) {
      return res.status(404).send('ID is undefined');
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send('No Booking Layout field with that id');
    }

    await BookingModel.findByIdAndRemove(id);
    res.json({ message: 'Booking Layout deleted successfully' });
  } catch (error) {
    res.status(209).json({ message: getErrorMessage(error) });
  }
};

//TODO getBookedTimesController
//TODO getBookedDatesController
//TODO delete appointments from the database which are in the past
