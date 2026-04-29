import { Schedule } from '../models/Schedule.js';

export const getSchedule = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      res.status(400).json({ error: 'userId is required' });
      return;
    }

    const schedule = await Schedule.find({ userId });
    res.status(200).json(schedule);
  } catch (error) {
    console.error('Error fetching schedule:', error);
    res.status(500).json({ error: 'Error fetching schedule' });
  }
};

export const createSchedule = async (req, res) => {
  try {
    const { userId, time, ampm, subject, prof, room } = req.body;
    
    if (!userId || !time || !ampm || !subject || !prof || !room) {
      res.status(400).json({ error: 'All fields are required' });
      return;
    }

    const schedule = await Schedule.create({ userId, time, ampm, subject, prof, room });
    res.status(201).json(schedule);
  } catch (error) {
    console.error('Error creating schedule:', error);
    res.status(500).json({ error: 'Error creating schedule' });
  }
};
