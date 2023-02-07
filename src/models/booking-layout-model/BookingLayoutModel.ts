import mongoose from 'mongoose';

const bookingLayoutSchema = new mongoose.Schema({
  inputs: [
    {
      inputType: String,
      label: String,
      required: Boolean,
    },
  ],
  name: { type: String, required: true, unique: true },
  userId: mongoose.Types.ObjectId,
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

export const BookingLayoutModel = mongoose.model(
  'BookingLayoutModel',
  bookingLayoutSchema
);
