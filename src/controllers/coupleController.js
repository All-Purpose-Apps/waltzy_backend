import Couple from '../models/Couple.js';

// Create a new couple
export async function createCouple(req, res) {
  try {
    const newCouple = new Couple(req.body);
    if (!newCouple) {
      return res.status(400).json({ message: 'Couple not created' });
    }
    await newCouple.save();
    const couples = await Couple.find()
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
    res.status(201).json(couples);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: 'Failed to create couple', error });
  }
}

// Get all couples
export async function getCouples(req, res) {
  try {
    const couples = await Couple.find()
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
    console.log(error);
    res.status(500).json({ message: 'Failed to get couples', error });
  }
}

// Get a single couple by ID
export async function getCoupleById(req, res) {
  try {
    const couple = await Couple.find({ _id: { $in: req.params.id } })
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
    res.json(couple);
  } catch (error) {
    console.log(error);
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
  try {
    const deletedCouple = await Couple.findByIdAndDelete(req.params.id);
    if (!deletedCouple) {
      return res.status(404).json({ message: 'Couple not found' });
    }
    const couples = await Couple.find()
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
    res.status(201).json(couples);
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete couple', error });
  }
}
