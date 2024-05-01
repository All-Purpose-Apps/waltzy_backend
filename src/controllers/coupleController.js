import Couple from '../models/Couple.js';

// Create a new couple
export async function createCouple(req, res) {
  try {
    const newCouple = new Couple(req.body);
    const savedCouple = await newCouple.save();
    res.status(201).json({ id: savedCouple._id, ...savedCouple._doc });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Failed to create couple', error });
  }
}

// Get all couples
export async function getCouples(req, res) {
  // console.log('getCouples');
  try {
    const couples = await Couple.find()
      .sort([[req.query._sort, req.query._order.toLowerCase()]])
      .populate({
        path: 'leader', // assuming 'leader' refers to a Person model
        model: 'Person',
      })
      .populate({
        path: 'follower', // assuming 'follower' also refers to a Person model
        model: 'Person',
      })
      .populate({
        path: 'dance',
        model: 'Dance',
        populate: {
          // Nested populate for 'danceCategory' within 'dance'
          path: 'danceCategory',
          model: 'DanceCategory',
        },
      });
    const transformedItems = couples.map((item) => ({
      id: item._id.toString(), // Map _id to id
      ...item._doc, // Spread the rest of the item
    }));
    const count = await Couple.countDocuments();
    res.header('X-Total-Count', `${count}`);
    res.json(transformedItems);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get couples', error });
  }
}

// Get a single couple by ID
export async function getCoupleById(req, res) {
  const resultArray = req.params.id.split(',').filter((id) => id.trim() !== '');
  try {
    const couple = await Couple.find({ _id: { $in: resultArray } })
      .populate({
        path: 'leader', // assuming 'leader' refers to a Person model
        model: 'Person',
      })
      .populate({
        path: 'follower', // assuming 'follower' also refers to a Person model
        model: 'Person',
      })
      .populate({
        path: 'dance',
        model: 'Dance',
        populate: {
          // Nested populate for 'danceCategory' within 'dance'
          path: 'danceCategory',
          model: 'DanceCategory',
        },
      });
    if (!couple) {
      return res.status(404).json({ message: 'Couple not found' });
    }
    const transformedItems = couple.map((item) => ({
      id: item._id,
      ...item._doc, // Spread the rest of the item
    }));
    res.json(transformedItems);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get couple', error });
  }
}

// Update a couple
export async function updateCouple(req, res) {
  try {
    const updatedCouple = await Couple.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCouple) {
      return res.status(404).json({ message: 'Couple not found' });
    }
    res.json({
      id: updatedCouple._id,
      ...updatedCouple._doc, // Spread the rest of the item
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Failed to update couple', error });
  }
}

// Delete a couple
export async function deleteCouple(req, res) {
  const resultArray = req.params.id.split(',');
  try {
    const deletedCouple = await Couple.deleteMany({ _id: { $in: resultArray } });
    if (!deletedCouple) {
      return res.status(404).json({ message: 'Couple not found' });
    }
    res.json({ message: 'Couple deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete couple', error });
  }
}
