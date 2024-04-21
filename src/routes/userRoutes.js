const express = require('express');
const router = express.Router();
const { getUserDetails, updateUserDetails } = require('../controllers/userController');

router.get('/user/:firebaseUid', getUserDetails);
router.put('/user/:firebaseUid', updateUserDetails);

module.exports = router;
