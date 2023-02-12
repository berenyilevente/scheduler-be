import mongoose from 'mongoose';

const authSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export const AuthModel = mongoose.model('AuthModel', authSchema);
