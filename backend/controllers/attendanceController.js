import { Attendance } from '../models/Attendance.js';

export const getAttendance = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      res.status(400).json({ error: 'userId is required' });
      return;
    }

    const records = await Attendance.find({ userId });
    res.status(200).json(records);
  } catch (error) {
    console.error('Error fetching attendance:', error);
    res.status(500).json({ error: 'Error fetching attendance' });
  }
};

export const createAttendance = async (req, res) => {
  try {
    const { userId, date, day, subject, time, status } = req.body;
    
    if (!userId || !date || !day || !subject || !time || !status) {
      res.status(400).json({ error: 'All fields are required' });
      return;
    }

    const record = await Attendance.create({ userId, date, day, subject, time, status });
    res.status(201).json(record);
  } catch (error) {
    console.error('Error creating attendance:', error);
    res.status(500).json({ error: 'Error creating attendance' });
  }
};
