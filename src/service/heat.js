export async function getAllHeats(adminDbConnection) {
  try {
    const Heat = await adminDbConnection.model('Heat');
    const results = await Heat.find()
      .populate({
        path: 'entries',
        populate: [
          { path: 'leader', model: 'Dancer' },
          { path: 'follower', model: 'Dancer' },
          {
            path: 'dance',
            model: 'Dance',
            populate: {
              path: 'danceCategory',
              model: 'DanceCategory',
            },
          },
        ],
      })
      .populate({
        path: 'dance',
        populate: [{ path: 'danceCategory', model: 'DanceCategory' }],
      });
    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createHeat(adminDbConnection, req, res) {
  try {
    const Heat = await adminDbConnection.model('Heat');
    await Heat.insertMany(req.body, { ordered: false })
      .then((result) => {
        console.log('Insert successful');
      })
      .catch((error) => {
        if (error.code === 11000) {
          console.log('Duplicate keys found, but operation continued.');
        } else {
          console.error('Insert error:', error);
        }
      });
    const populatedHeats = await Heat.find()
      .populate({
        path: 'entries',
        populate: [
          { path: 'leader', model: 'Dancer' },
          { path: 'follower', model: 'Dancer' },
        ],
      })
      .populate({
        path: 'dance',
        populate: [{ path: 'danceCategory', model: 'DanceCategory' }],
      });
    return populatedHeats;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getHeat(adminDbConnection, req) {
  try {
    const Heat = await adminDbConnection.model('Heat');
    const result = await Heat.findById(req.params.id)
      .populate({
        path: 'entries',
        populate: [
          { path: 'leader', model: 'Dancer' },
          { path: 'follower', model: 'Dancer' },
        ],
      })
      .populate({
        path: 'dance',
        populate: [{ path: 'danceCategory', model: 'DanceCategory' }],
      });

    if (!result) {
      return res.status(404).json({ message: 'Heat not found' });
    }
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateHeat(adminDbConnection, req) {
  try {
    const Heat = await adminDbConnection.model('Heat');
    const updatedHeat = await Heat.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedHeat) {
      return res.status(404).json({ message: 'Heat not found' });
    }
    return updatedHeat;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteHeat(adminDbConnection, req) {
  const resultArray = req.params.id.split(',');

  try {
    const Heat = await adminDbConnection.model('Heat');
    const deletedHeat = await Heat.deleteMany({ _id: { $in: resultArray } });
    if (!deletedHeat) {
      return res.status(404).json({ message: 'Heat not found' });
    }
    const heats = await Heat.find().populate({
      path: 'entries',
      populate: [
        { path: 'leader', model: 'Dancer' },
        { path: 'follower', model: 'Dancer' },
        {
          path: 'dance',
          model: 'Dance',
          populate: { path: 'danceCategory', model: 'DanceCategory' },
        },
      ],
    });
    return heats;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
