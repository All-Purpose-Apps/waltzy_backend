import DanceCategory from '../models/DanceCategory.js';
import Heat from '../models/Heat.js';

export async function createHeat(req, res) {
  try {
    const newHeat = new Heat(req.body);
    await newHeat.save();
    res.status(201).json({
      id: newHeat._id,
      ...newHeat._doc, // Spread the rest of the item
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Error creating heat', error });
  }
}

export async function getHeats(req, res) {
  try {
    const heats = await Heat.find()
      .sort([[req.query._sort, req.query._order.toLowerCase()]])
      .populate({
        path: 'couples',
        populate: [
          { path: 'leader', model: 'Person' },
          { path: 'follower', model: 'Person' },
          {
            path: 'dance',
            model: 'Dance',
            populate: { path: 'danceCategory', model: 'DanceCategory' },
          },
        ],
      });
    const transformedItems = heats.map((item, index) => {
      return {
        number: index + 1,
        id: item._id,
        ...item._doc, // Spread the rest of the item
      };
    });
    const count = await Heat.countDocuments();
    res.header('X-Total-Count', `${count}`);
    res.json(transformedItems);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error fetching heats', error });
  }
}

export async function getHeat(req, res) {
  try {
    const heat = await Heat.findById(req.params.id).populate({
      path: 'couples',
      populate: [
        { path: 'leader', model: 'Person' },
        { path: 'follower', model: 'Person' },
        {
          path: 'dance',
          model: 'Dance',
          populate: { path: 'danceCategory', model: 'DanceCategory' },
        },
      ],
    });

    if (!heat) {
      return res.status(404).json({ message: 'Heat not found' });
    }
    const newHeat = { ...heat._doc, id: heat._id };
    res.json(newHeat);
  } catch (error) {
    console.log(error);
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
  const resultArray = req.params.id.split(',');
  try {
    const deletedHeat = await Heat.deleteMany({ _id: { $in: resultArray } });
    if (!deletedHeat) {
      return res.status(404).json({ message: 'Heat not found' });
    }
    res.json({ message: 'Heat deleted successfully' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Error deleting heat', error });
  }
}
