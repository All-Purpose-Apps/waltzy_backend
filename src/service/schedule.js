export async function getAllSchedules(adminDbConnection) {
  try {
    const Schedule = await adminDbConnection.model('Schedule');
    const results = await Schedule.find({}).populate({
      path: 'dances',
      model: 'Dance',
      populate: {
        path: 'danceCategory',
        model: 'DanceCategory',
      },
    });
    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createSchedule(adminDbConnection, req, res) {
  try {
    const Schedule = await adminDbConnection.model('Schedule');
    const newSchedule = new Schedule(req.body);
    await newSchedule.save();
    return newSchedule;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getSchedule(adminDbConnection, req, res) {
  try {
    const Schedule = await adminDbConnection.model('Schedule');
    const results = await Schedule.find({ _id: req.params.id }).populate({
      path: 'dances',
      model: 'Dance',
      populate: {
        path: 'danceCategory',
        model: 'DanceCategory',
      },
    });
    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateSchedule(adminDbConnection, req, res) {
  try {
    const Schedule = await adminDbConnection.model('Schedule');
    const result = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function deleteSchedule(adminDbConnection, req, res) {
  const resultArray = req.params.id.split(',');
  try {
    const Schedule = await adminDbConnection.model('Schedule');
    const result = await Schedule.deleteMany({ _id: { $in: resultArray } });
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
