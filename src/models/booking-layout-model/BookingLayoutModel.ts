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
  userId: String,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const BookingLayoutModel = mongoose.model(
  'BookingLayoutModel',
  bookingLayoutSchema
);
