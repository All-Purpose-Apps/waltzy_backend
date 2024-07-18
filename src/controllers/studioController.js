import Studio from '../models/Studio.js';
import Person from '../models/Person.js';

export async function getAllStudios(req, res) {
  try {
    const results = await Studio.find({});
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

export async function createStudio(req, res) {
  try {
    const newStudio = new Studio(req.body);
    await newStudio.save();
    const studios = await Studio.find({});
    res.status(201).json(studios);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

export async function getStudio(req, res) {
  try {
    const results = await Studio.find({ _id: req.params.id });
    const peopleInStudio = await Person.find({ studio: { $in: req.params.id } });
    if (!results) {
      return res.status(404).json({ message: 'Studio not found' });
    }
    const studio = { ...results, people: peopleInStudio };
    res.json(studio);
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
    res.json(studio._doc);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function deleteStudio(req, res) {
  try {
    const peopleInStudio = await Person.find({ studio: { $in: req.params.id } });
    if (peopleInStudio.length > 0) {
      return res.status(400).json({ message: 'Cannot delete studio with people in it' });
    } else {
      const studio = await Studio.deleteMany({ _id: { $in: req.params.id } });
      if (!studio) {
        return res.status(404).json({ message: 'Studio not found' });
      }
    }
    const studios = await Studio.find({});
    res.status(201).json(studios);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
