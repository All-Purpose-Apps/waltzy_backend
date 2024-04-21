import User from '../models/User.js';

export async function getUserDetails(req, res) {
  try {
    const user = await User.findOne({ firebaseUid: req.params.firebaseUid }).populate('person');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function updateUserDetails(req, res) {
  try {
    const user = await User.findOneAndUpdate({ firebaseUid: req.params.firebaseUid }, req.body, { new: true }).populate('person');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(400).json(error);
  }
}
