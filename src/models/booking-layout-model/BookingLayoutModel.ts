import mongoose from 'mongoose';

const bookingLayoutSchema = new mongoose.Schema({
  inputs: [
    {
      inputType: String,
      label: String,
      required: Boolean,
    },
  ],
  name: String,
});

export const BookingLayoutModel = mongoose.model(
  'BookingLayoutModel',
  bookingLayoutSchema
);
