import express from 'express';
const router = express.Router();
import { getAllDances, createDance, getDance, updateDance, deleteDance, getDancesByCategory } from '../controllers/danceController.js';

router.route('/').get(getAllDances).post(createDance);

router.route('/:id').get(getDance).put(updateDance).delete(deleteDance);

router.route('/category/:id').get(getDancesByCategory);

export default router;
