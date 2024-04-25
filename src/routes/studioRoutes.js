import express from 'express';
const router = express.Router();
import { getAllStudios, createStudio, getStudio, updateStudio, deleteStudio } from '../controllers/studioController.js';

router.route('/').get(getAllStudios).post(createStudio);

router.route('/:id').get(getStudio).put(updateStudio).delete(deleteStudio);

export default router;
