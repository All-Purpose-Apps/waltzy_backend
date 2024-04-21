const DanceCategory = require('../models/DanceCategory');

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await DanceCategory.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.createCategory = async (req, res) => {
  try {
    const newCategory = new DanceCategory(req.body);
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getCategory = async (req, res) => {
  try {
    const category = await DanceCategory.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const category = await DanceCategory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const category = await DanceCategory.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
};
