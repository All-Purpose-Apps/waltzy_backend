import express from 'express';
const router = express.Router();
import { getAllPeople, createPerson, getPerson, updatePerson, deletePerson, getMultiplePeople } from '../controllers/personController.js';

router.route('/').get(getAllPeople).post(createPerson);

router.route('/:id').get(getPerson).put(updatePerson).delete(deletePerson);

router.route('/multiple').get(getMultiplePeople);

export default router;
