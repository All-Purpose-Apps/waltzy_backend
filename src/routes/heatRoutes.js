import express from 'express';
import { createHeat, getHeats, getHeat, updateHeat, deleteHeat } from '../controllers/heatController.js';

const router = express.Router();

// Route to create a new heat
router.post('/', createHeat);

// Route to get all heats
router.get('/', getHeats);

// Route to get a specific heat by ID
router.get('/:id', getHeat);

// Route to update a specific heat by ID
router.put('/:id', updateHeat);

// Route to delete a specific heat by ID
router.delete('/:id', deleteHeat);

export default router;
