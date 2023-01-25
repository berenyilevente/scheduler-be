import { BookingLayoutModel } from '@/models';
import { BookingLayoutArgs, getErrorMessage } from '@/utils';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

export const getBookingLayoutController = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
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

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(404).send('No booking layouts with that id');
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
): Promise<void> => {
  const bookingLayout: BookingLayoutArgs = req.body;
  const newBookingLayout = new BookingLayoutModel(bookingLayout);

  console.log(bookingLayout);

  try {
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
  const { id } = req.params;
  const bookingLayout: BookingLayoutArgs = req.body;

  try {
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
  const deleteId: { bookingLayoutId: string; inputId: string } = req.body;
  if (deleteId === undefined) {
    return res.status(404).send('ID is undefined');
  }

  if (!mongoose.Types.ObjectId.isValid(deleteId.bookingLayoutId)) {
    return res.status(404).send('No booking layout or input with that id');
  }

  try {
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
  const { id } = req.params;

  if (id === undefined) {
    return res.status(404).send('ID is undefined');
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).send('No Booking Layout field with that id');
  }

  try {
    await BookingLayoutModel.findByIdAndRemove(id);
    res.json({ message: 'Booking Layout deleted successfully' });
  } catch (error) {
    res.status(209).json({ message: getErrorMessage(error) });
  }
};
