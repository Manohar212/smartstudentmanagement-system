import express from 'express';
import { getSchedule, createSchedule } from '../controllers/scheduleController.js';

const router = express.Router();

router.get('/', getSchedule);
router.post('/', createSchedule);

export default router;
