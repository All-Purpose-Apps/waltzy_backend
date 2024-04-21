import DanceCategory from '../models/DanceCategory.js';

export async function getAllCategories(req, res) {
  try {
    const categories = await DanceCategory.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function createCategory(req, res) {
  try {
    const newCategory = new DanceCategory(req.body);
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function getCategory(req, res) {
  try {
    const category = await DanceCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function updateCategory(req, res) {
  try {
    const category = await DanceCategory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function deleteCategory(req, res) {
  try {
    const category = await DanceCategory.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
}
