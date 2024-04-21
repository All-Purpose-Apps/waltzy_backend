import express from 'express';
const router = express.Router();
import { getAllCategories, createCategory, getCategory, updateCategory, deleteCategory } from '../controllers/danceCategoryController.js';

router.route('/').get(getAllCategories).post(createCategory);

router.route('/:id').get(getCategory).put(updateCategory).delete(deleteCategory);

export default router;
