export async function getAllDancers(adminDbConnection) {
  try {
    const Dancer = await adminDbConnection.model('Dancer');
    const dancers = await Dancer.find({}).populate('studio');
    return dancers;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createDancer(adminDbConnection, req, res) {
  try {
    const Dancer = await adminDbConnection.model('Dancer');
    const newDancer = new Dancer(req.body);
    await newDancer.save();
    const dancers = await Dancer.find({}).populate('studio');
    return dancers;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getDancer(adminDbConnection, req, res) {
  try {
    const Dancer = await adminDbConnection.model('Dancer');
    const results = await Dancer.find({ _id: req.params.id }).populate('studio');
    if (!results) {
      throw new Error('Dancer not found');
    }
    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateDancer(adminDbConnection, req, res) {
  try {
    const Dancer = await adminDbConnection.model('Dancer');
    const dancer = await Dancer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!dancer) {
      throw new Error('Dancer not found');
    }
    return dancer._doc;
  } catch (error) {
    throw error;
  }
}

export async function deleteDancer(adminDbConnection, req, res) {
  const resultArray = req.params.id.split(',');
  try {
    const Dancer = await adminDbConnection.model('Dancer');
    const Entry = await adminDbConnection.model('Entry');
    const existingEntries = await Entry.find({
      $or: [{ follower: { $in: resultArray } }, { leader: { $in: resultArray } }],
    });
    if (existingEntries.length > 0) {
      return res.status(400).json({ message: 'Cannot delete dancer as they are part of an Entry' });
    }
    const dancer = await Dancer.deleteMany({ _id: { $in: resultArray } });
    if (!dancer) {
      throw new Error('Dancer not found');
    }
    const results = await Dancer.find().populate('studio');
    return results;
  } catch (error) {
    throw error;
  }
}
