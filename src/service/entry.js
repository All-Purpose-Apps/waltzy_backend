import { checkEntry } from '../utils/createEntries.js';

export async function getAllEntries(adminDbConnection) {
  try {
    const Entry = await adminDbConnection.model('Entry');
    const entries = await Entry.find()
      .populate({
        path: 'leader',
        model: 'Dancer',
      })
      .populate({
        path: 'follower',
        model: 'Dancer',
      })
      .populate({
        path: 'dance',
        model: 'Dance',
        populate: {
          path: 'danceCategory',
          model: 'DanceCategory',
        },
      });
    return entries;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createEntry(adminDbConnection, req, res) {
  try {
    const Entry = await adminDbConnection.model('Entry');
    const entries = await Entry.find();
    const combinations = checkEntry({ data: entries }, req.body);
    await Entry.insertMany(combinations, { ordered: false })
      .then((result) => {
        console.log('Insert successful');
      })
      .catch((error) => {
        if (error.name === 'MongoBulkWriteError' && error.code === 11000) {
          console.log('Duplicate keys found, but operation continued.');
        } else {
          console.error('Insert error:', error);
        }
      });
    const populatedEntries = await Entry.find()
      .populate({
        path: 'leader',
        model: 'Dancer',
      })
      .populate({
        path: 'follower',
        model: 'Dancer',
      })
      .populate({
        path: 'dance',
        model: 'Dance',
        populate: {
          path: 'danceCategory',
          model: 'DanceCategory',
        },
      });
    return populatedEntries;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getEntry(adminDbConnection, req, res) {
  try {
    const Entry = await adminDbConnection.model('Entry');
    const results = await Entry.find({ _id: req.params.id })
      .populate({
        path: 'leader',
        model: 'Dancer',
      })
      .populate({
        path: 'follower',
        model: 'Dancer',
      })
      .populate({
        path: 'dance',
        model: 'Dance',
        populate: {
          path: 'danceCategory',
          model: 'DanceCategory',
        },
      });
    if (!results) {
      throw new Error('Entry not found');
    }
    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateEntry(adminDbConnection, req, res) {
  try {
    const Entry = await adminDbConnection.model('Entry');
    const result = await Entry.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!result) {
      throw new Error('Entry not found');
    }
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteEntry(adminDbConnection, req, res) {
  const resultArray = req.params.id.split(',');
  try {
    const Entry = await adminDbConnection.model('Entry');
    const Heat = await adminDbConnection.model('Heat');
    const existingHeats = await Heat.find({ entries: { $in: resultArray } });
    if (existingHeats.length > 0) {
      throw new Error('Entries are in use in heats');
    } else {
      const deletedEntries = await Entry.deleteMany({ _id: { $in: resultArray } });
      if (!deletedEntries) {
        throw new Error('Entry not found');
      }
    }
    const entries = await Entry.find()
      .populate({
        path: 'leader',
        model: 'Dancer',
      })
      .populate({
        path: 'follower',
        model: 'Dancer',
      })
      .populate({
        path: 'dance',
        model: 'Dance',
        populate: {
          path: 'danceCategory',
          model: 'DanceCategory',
        },
      });
    return entries;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
