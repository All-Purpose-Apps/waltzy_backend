export async function getAllDances(adminDbConnection) {
  try {
    const Dance = await adminDbConnection.model('Dance');
    const dances = await Dance.find({}).populate('danceCategory');
    return dances;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function createDance(adminDbConnection, req, res) {
  try {
    const Dance = await adminDbConnection.model('Dance');
    const newDance = new Dance(req.body);
    await newDance.save();
    const dances = await Dance.find({});
    return dances;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getDance(adminDbConnection, req, res) {
  try {
    const Dance = await adminDbConnection.model('Dance');
    const results = await Dance.find({ _id: req.params.id }).populate('danceCategory');
    if (!results) {
      throw new Error('Dance not found');
    }
    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateDance(adminDbConnection, req, res) {
  try {
    const Dance = await adminDbConnection.model('Dance');
    const dance = await Dance.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('danceCategory');
    if (!dance) {
      throw new Error('Dance not found');
    }
    return dance._doc;
  } catch (error) {
    throw error;
  }
}

export async function deleteDance(adminDbConnection, req, res) {
  try {
    const Dance = await adminDbConnection.model('Dance');
    const dance = await Dance.findByIdAndDelete(req.params.id);
    if (!dance) {
      throw new Error('Dance not found');
    }
    return dance;
  } catch (error) {
    throw error;
  }
}
