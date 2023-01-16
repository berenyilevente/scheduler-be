import mongoose from 'mongoose';

const inputSchema = new mongoose.Schema({
  inputType: String,
  label: String,
  required: Boolean,
});

export const InputModel = mongoose.model('InputModel', inputSchema);
