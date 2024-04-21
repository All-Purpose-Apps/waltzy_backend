import express from 'express';
const router = express.Router();
import { getAllDances, createDance, getDance, updateDance, deleteDance } from '../controllers/danceController.js';

router.route('/').get(getAllDances).post(createDance);

router.route('/:id').get(getDance).put(updateDance).delete(deleteDance);

export default router;
