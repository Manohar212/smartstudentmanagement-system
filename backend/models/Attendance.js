import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  day: { type: String, required: true },
  subject: { type: String, required: true },
  time: { type: String, required: true },
  status: { type: String, required: true } // Present / Absent
});

export const Attendance = mongoose.model('Attendance', attendanceSchema);
