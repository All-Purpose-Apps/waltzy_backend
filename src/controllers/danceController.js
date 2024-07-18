import Dance from '../models/Dance.js';

export async function getAllDances(req, res) {
  try {
    const dances = await Dance.find({}).populate('danceCategory');
    res.json(dances);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function createDance(req, res) {
  try {
    const newDance = new Dance(req.body);
    await newDance.save();
    res.status(201).json({ id: newDance._id, ...newDance._doc });
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function getDance(req, res) {
  const resultArray = req.params.id.split(',');
  try {
    const results = await Dance.find({ _id: { $in: resultArray } }).populate({
      path: 'danceCategory',
      model: 'DanceCategory',
    });
    if (!results) {
      return res.status(404).json({ message: 'Dance not found' });
    }
    const transformedItems = results.map((item) => ({
      id: item._id, // Map _id to id
      ...item._doc, // Spread the rest of the item
    }));
    res.json(transformedItems);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function getDancesByCategory(req, res) {
  try {
    const dance = await Dance.find({ danceCategory: req.params.id });
    const transformedItems = dance.map((item) => ({
      id: item._id, // Map _id to id
      ...item._doc, // Spread the rest of the item
    }));
    if (!dance) {
      return res.status(404).json({ message: 'Dance Category not found' });
    }
    res.json({ data: transformedItems, total: transformedItems.length });
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function updateDance(req, res) {
  try {
    const dance = await Dance.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!dance) {
      return res.status(404).json({ message: 'Dance not found' });
    }
    res.json(dance);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function deleteDance(req, res) {
  try {
    const dance = await Dance.findByIdAndDelete(req.params.id);
    if (!dance) {
      return res.status(404).json({ message: 'Dance not found' });
    }
    res.json({ message: 'Dance deleted successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
}
