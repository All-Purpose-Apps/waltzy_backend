import Studio from '../models/Studio.js';

export async function getAllStudios(req, res) {
  try {
    const results = await Studio.find({}).sort([[req.query._sort, req.query._order.toLowerCase()]]);
    const transformedItems = results.map((item) => ({
      id: item._id, // Map _id to id
      ...item._doc, // Spread the rest of the item
    }));
    const count = await Studio.countDocuments();
    res.header('X-Total-Count', `${count}`);
    res.json(transformedItems);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function createStudio(req, res) {
  try {
    const newStudio = new Studio(req.body);
    await newStudio.save();
    res.status(201).json({ id: newStudio._id, ...newStudio._doc });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

export async function getStudio(req, res) {
  const resultArray = req.params.id.split(',');
  try {
    const results = await Studio.find({ _id: { $in: resultArray } });
    if (!results) {
      return res.status(404).json({ message: 'Studio not found' });
    }
    const transformedItems = results.map((item) => ({
      id: item._id, // Map _id to id
      ...item._doc, // Spread the rest of the item
    }));
    res.json(transformedItems);
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
}

export async function updateStudio(req, res) {
  try {
    const studio = await Studio.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!studio) {
      return res.status(404).json({ message: 'Studio not found' });
    }
    res.json({ id: studio._id, ...studio._doc });
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function deleteStudio(req, res) {
  const resultArray = req.params.id.split(',');
  try {
    const studio = await Studio.deleteMany({ _id: { $in: resultArray } });
    if (!studio) {
      return res.status(404).json({ message: 'Studio not found' });
    }
    res.json({ message: 'Studio deleted successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
}
