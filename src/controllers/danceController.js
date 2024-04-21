import Dance from '../models/Dance.js';

export async function getAllDances(req, res) {
  try {
    const dances = await Dance.find().populate('category');
    res.json(dances);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function createDance(req, res) {
  try {
    const newDance = new Dance(req.body);
    await newDance.save();
    res.status(201).json(newDance);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function getDance(req, res) {
  try {
    const dance = await Dance.findById(req.params.id).populate('category');
    if (!dance) {
      return res.status(404).json({ message: 'Dance not found' });
    }
    res.json(dance);
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
