import DanceCategory from '../models/DanceCategory.js';
import Heat from '../models/Heat.js';

export async function createHeat(req, res) {
  try {
    const newHeat = new Heat(req.body);
    await newHeat.save();
    res.status(201).json(newHeat);
  } catch (error) {
    res.status(400).json({ message: 'Error creating heat', error });
  }
}

export async function getHeats(req, res) {
  try {
    const heats = await Heat.find()
      .populate({
        path: 'couples',
        populate: {
          path: 'leader follower',
          model: 'Person',
        },
      })
      .populate({
        path: 'dance',
        populate: {
          path: 'category',
          model: 'DanceCategory',
        },
      });
    res.json(heats);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching heats', error });
  }
}

export async function getHeat(req, res) {
  try {
    const heat = await Heat.findById(req.params.id)
      .populate({
        path: 'couples',
        populate: {
          path: 'leader follower',
          model: 'Person',
        },
      })
      .populate({
        path: 'dance',
        populate: {
          path: 'category',
          model: 'DanceCategory',
        },
      });
    if (!heat) {
      return res.status(404).json({ message: 'Heat not found' });
    }
    res.json(heat);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching heat', error });
  }
}

export async function updateHeat(req, res) {
  try {
    const updatedHeat = await Heat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedHeat) {
      return res.status(404).json({ message: 'Heat not found' });
    }
    res.json(updatedHeat);
  } catch (error) {
    res.status(400).json({ message: 'Error updating heat', error });
  }
}

export async function deleteHeat(req, res) {
  try {
    const deletedHeat = await Heat.findByIdAndDelete(req.params.id);
    if (!deletedHeat) {
      return res.status(404).json({ message: 'Heat not found' });
    }
    res.json({ message: 'Heat deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting heat', error });
  }
}
