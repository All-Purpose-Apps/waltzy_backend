import express from 'express';
import { getUserDetails, updateUserDetails } from '../controllers/userController.js';

const router = express.Router();

router.get('/user/:firebaseUid', getUserDetails);
router.put('/user/:firebaseUid', updateUserDetails);

export default router;
