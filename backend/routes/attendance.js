import express from 'express';
import { getAttendance, createAttendance } from '../controllers/attendanceController.js';

const router = express.Router();

router.get('/', getAttendance);
router.post('/', createAttendance);

export default router;
