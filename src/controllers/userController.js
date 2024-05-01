import User from '../models/User.js';

export async function getUserDetails(req, res) {
  try {
    const user = await User.findOne({ firebaseUid: req.params.firebaseUid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function createUser(req, res) {
  try {
    const user = new User(req.body);
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function updateUserDetails(req, res) {
  try {
    const user = await User.findOneAndUpdate({ firebaseUid: req.params.firebaseUid }, req.body, { new: true });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function deleteUser(req, res) {
  try {
    const user = await User.findOneAndDelete({ firebaseUid: req.params.firebaseUid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function getAllUsers(req, res) {
  console.log('getAllUsers');
  try {
    const results = await User.find({});
    const transformedItems = results.map((item) => ({
      id: item._id, // Map _id to id
      ...item._doc, // Spread the rest of the item
    }));
    const count = await User.countDocuments();
    res.header('X-Total-Count', `${count}`);
    res.json(transformedItems);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
