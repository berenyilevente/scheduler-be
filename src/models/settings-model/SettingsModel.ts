import mongoose from 'mongoose';

const settingsSchema = new mongoose.Schema({
  workingHours: [String],
  userId: mongoose.Types.ObjectId,
});

export const SettingsModel = mongoose.model('SettingsModel', settingsSchema);
