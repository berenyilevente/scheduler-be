import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  apiKey: { type: String, required: true },
});

export const UserModel = mongoose.model('UserModel', userSchema);
