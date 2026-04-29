import { Assignment } from '../models/Assignment.js';

export const getAssignments = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId) {
      res.status(400).json({ error: 'userId is required' });
      return;
    }

    const assignments = await Assignment.find({ userId });
    res.status(200).json(assignments);
  } catch (error) {
    console.error('Error fetching assignments:', error);
    res.status(500).json({ error: 'Error fetching assignments' });
  }
};

export const createAssignment = async (req, res) => {
  try {
    const { userId, title, desc, subject, dueDate, status } = req.body;
    
    if (!userId || !title || !subject || !dueDate || !status) {
      res.status(400).json({ error: 'Required fields are missing' });
      return;
    }

    const assignment = await Assignment.create({ userId, title, desc, subject, dueDate, status });
    res.status(201).json(assignment);
  } catch (error) {
    console.error('Error creating assignment:', error);
    res.status(500).json({ error: 'Error creating assignment' });
  }
};

export const updateAssignment = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const assignment = await Assignment.findByIdAndUpdate(id, { status }, { new: true });
    if (!assignment) {
      res.status(404).json({ error: 'Assignment not found' });
      return;
    }

    res.status(200).json(assignment);
  } catch (error) {
    console.error('Error updating assignment:', error);
    res.status(500).json({ error: 'Error updating assignment' });
  }
};
