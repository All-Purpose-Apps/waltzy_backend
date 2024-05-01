import express from 'express';
import { getUserDetails, updateUserDetails, deleteUser, getAllUsers, createUser } from '../controllers/userController.js';

const router = express.Router();

router.get(':firebaseUid', getUserDetails);
router.get('/', getAllUsers);
router.post('/', createUser);
router.put(':firebaseUid', updateUserDetails);
router.delete(':firebaseUid', deleteUser);

export default router;
