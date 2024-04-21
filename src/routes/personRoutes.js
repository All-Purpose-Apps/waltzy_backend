const express = require('express');
const router = express.Router();
const { getAllPeople, createPerson, getPerson, updatePerson, deletePerson } = require('../controllers/personController');

router.route('/').get(getAllPeople).post(createPerson);

router.route('/:id').get(getPerson).put(updatePerson).delete(deletePerson);

module.exports = router;
