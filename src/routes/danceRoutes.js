const express = require('express');
const router = express.Router();
const { getAllDances, createDance, getDance, updateDance, deleteDance } = require('../controllers/danceController');

router.route('/').get(getAllDances).post(createDance);

router.route('/:id').get(getDance).put(updateDance).delete(deleteDance);

module.exports = router;
