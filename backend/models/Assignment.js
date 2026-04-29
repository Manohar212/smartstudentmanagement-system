import mongoose from 'mongoose';

const assignmentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  desc: { type: String },
  subject: { type: String, required: true },
  dueDate: { type: String, required: true },
  status: { type: String, required: true } // Pending / Completed
});

export const Assignment = mongoose.model('Assignment', assignmentSchema);
