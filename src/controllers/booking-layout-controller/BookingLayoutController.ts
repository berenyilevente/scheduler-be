import { BookingLayoutModel, UserModel } from '@/models';
import {
  BookingLayoutArgs,
  BookingLayoutUser,
  getErrorMessage,
  UserArgs,
} from '@/utils';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

export const getBookingLayoutController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.body.userId;
    const bookingLayouts: BookingLayoutArgs[] = await BookingLayoutModel.find({
      userId,
    });
    res.status(200).json(bookingLayouts);
  } catch (error: any) {
    res.status(404).json({ message: getErrorMessage(error) });
  }
};

export const getBookingLayoutByIdController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send('No booking layouts with that id');
    }
    const bookingLayouts: BookingLayoutArgs[] | null =
      await BookingLayoutModel.findById(id);

    res.status(200).json(bookingLayouts);
  } catch (error: any) {
    res.status(404).json({ message: getErrorMessage(error) });
  }
};

export const postBookingLayoutController = async (
  req: Request,
  res: Response
) => {
  try {
    const bookingLayout: BookingLayoutArgs = req.body;
    const name = bookingLayout.name;
    const userId: string = req.body.userId;
    const user: UserArgs | null = await UserModel.findById(userId);
    const existingBookingLayout = await BookingLayoutModel.findOne({ name });

    if (user === null) {
      return res
        .status(404)
        .json({ message: 'No associated user found for this booking layout' });
    }

    if (existingBookingLayout) {
      return res
        .status(400)
        .json({ message: 'Booking layout with that name already exists' });
    }

    const newBookingLayout = new BookingLayoutModel({
      ...bookingLayout,
      userId: req.body.userId,
      createdAt: new Date().toISOString(),
    });

    await newBookingLayout.save();
    res.status(201).json(newBookingLayout);
  } catch (error) {
    res.status(209).json({ message: getErrorMessage(error) });
  }
};

export const patchBookingLayoutController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;
    const bookingLayout: BookingLayoutArgs = req.body;

    const updatedBookingLayout = await BookingLayoutModel.findByIdAndUpdate(
      id,
      bookingLayout,
      { new: true }
    );
    res.json(updatedBookingLayout);
  } catch (error) {
    res.status(209).json({ message: getErrorMessage(error) });
  }
};

export const deleteInputFromBookingLayoutController = async (
  req: Request,
  res: Response
) => {
  try {
    const deleteId: { bookingLayoutId: string; inputId: string } = req.body;
    if (deleteId === undefined) {
      return res.status(404).send('ID is undefined');
    }

    if (!mongoose.Types.ObjectId.isValid(deleteId.bookingLayoutId)) {
      return res.status(404).send('No booking layout or input with that id');
    }

    await BookingLayoutModel.findOneAndUpdate(
      { _id: deleteId.bookingLayoutId },
      { $pull: { inputs: { _id: deleteId.inputId } } },
      { new: true }
    );
    res.json({ message: 'Input deleted successfully from booking layout' });
  } catch (error) {
    res.status(209).json({ message: getErrorMessage(error) });
  }
};

export const deleteBookingLayoutController = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    if (id === undefined) {
      return res.status(404).send('ID is undefined');
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).send('No Booking Layout field with that id');
    }

    await BookingLayoutModel.findByIdAndRemove(id);
    res.json({ message: 'Booking Layout deleted successfully' });
  } catch (error) {
    res.status(209).json({ message: getErrorMessage(error) });
  }
};
