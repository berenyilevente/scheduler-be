import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String },
});

export const UserModel = mongoose.model('UserModel', userSchema);
