import DanceCategory from '../models/DanceCategory.js';

export async function getAllCategories(req, res) {
  try {
    // const results = await DanceCategory.find({});
    // console.log(results);
    // res.json(results);

    const results = await DanceCategory.find({}).sort([[req.query._sort, req.query._order.toLowerCase()]]);
    const transformedItems = results.map((item) => ({
      id: item._id, // Map _id to id
      ...item._doc, // Spread the rest of the item
    }));
    const count = await DanceCategory.countDocuments();
    res.header('X-Total-Count', `${count}`);
    res.json(transformedItems);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function createCategory(req, res) {
  try {
    const newCategory = new DanceCategory(req.body);
    await newCategory.save();
    res.status(201).json({ id: newCategory._id, ...newCategory._doc });
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
    res.json({ id: category._id, ...category._doc });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}

export async function updateCategory(req, res) {
  try {
    const category = await DanceCategory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ id: category._id, ...category._doc });
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function deleteCategory(req, res) {
  const resultArray = req.params.id.split(',');
  try {
    const category = await DanceCategory.deleteMany({ _id: { $in: resultArray } });
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
}
