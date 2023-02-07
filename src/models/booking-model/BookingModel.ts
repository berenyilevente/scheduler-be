import mongoose from 'mongoose';

const bookingModelSchema = new mongoose.Schema({
  inputs: [
    {
      inputType: String,
      value: String,
    },
  ],
  bookingId: mongoose.Types.ObjectId,
});

export const BookingModel = mongoose.model('BookingModel', bookingModelSchema);
