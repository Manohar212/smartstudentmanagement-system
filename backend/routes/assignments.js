import express from 'express';
import { getAssignments, createAssignment, updateAssignment } from '../controllers/assignmentsController.js';

const router = express.Router();

router.get('/', getAssignments);
router.post('/', createAssignment);
router.put('/:id', updateAssignment);

export default router;
