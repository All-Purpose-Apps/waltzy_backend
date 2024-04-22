import express from 'express';
import { createCouple, getCouples, getCoupleById, updateCouple, deleteCouple } from '../controllers/coupleController.js';

const router = express.Router();

// Route to create a new couple
router.post('/', createCouple);

// Route to get all couples
router.get('/', getCouples);

// Route to get a specific couple by ID
router.get('/:id', getCoupleById);

// Route to update a specific couple by ID
router.put('/:id', updateCouple);

// Route to delete a specific couple by ID
router.delete('/:id', deleteCouple);

export default router;
