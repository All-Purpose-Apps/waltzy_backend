import express from 'express';
const router = express.Router();
import { getAllPeople, createPerson, getPerson, updatePerson, deletePerson } from '../controllers/personController.js';

router.route('/').get(getAllPeople).post(createPerson);

router.route('/:id').get(getPerson).put(updatePerson).delete(deletePerson);

export default router;
