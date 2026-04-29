import mongoose from 'mongoose';

const scheduleSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  time: { type: String, required: true },
  ampm: { type: String, required: true },
  subject: { type: String, required: true },
  prof: { type: String, required: true },
  room: { type: String, required: true }
});

export const Schedule = mongoose.model('Schedule', scheduleSchema);
