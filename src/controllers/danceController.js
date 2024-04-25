import Dance from '../models/Dance.js';

export async function getAllDances(req, res) {
  try {
    const dances = await Dance.find({})
      .sort([[req.query._sort, req.query._order.toLowerCase()]])
      .populate('danceCategory');

    const transformedItems = dances.map((item) => ({
      id: item._id, // Map _id to id
      ...item._doc, // Spread the rest of the item
    }));
    const count = await Dance.countDocuments();
    res.header('X-Total-Count', `${count}`);
    res.json(transformedItems);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function createDance(req, res) {
  console.log(req.body);
  try {
    const newDance = new Dance(req.body);
    await newDance.save();
    res.status(201).json({ id: newDance._id, ...newDance._doc });
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function getDance(req, res) {
  try {
    const dance = await Dance.findById(req.params.id).populate('danceCategory');
    if (!dance) {
      return res.status(404).json({ message: 'Dance not found' });
    }
    res.json({ id: dance._id, ...dance._doc });
  } catch (error) {
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
