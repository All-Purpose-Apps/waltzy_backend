export async function getAllDanceCategories(adminDbConnection) {
  try {
    const DanceCategory = await adminDbConnection.model('DanceCategory');
    const danceCategories = await DanceCategory.find({});
    return danceCategories;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function createDanceCategory(adminDbConnection, req, res) {
  try {
    const DanceCategory = await adminDbConnection.model('DanceCategory');
    const newDanceCategory = new DanceCategory(req.body);
    await newDanceCategory.save();
    const danceCategories = await DanceCategory.find({});
    return danceCategories;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getDanceCategory(adminDbConnection, req, res) {
  try {
    const DanceCategory = await adminDbConnection.model('DanceCategory');
    const results = await DanceCategory.find({ _id: req.params.id });
    if (!results) {
      throw new Error('DanceCategory not found');
    }
    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateDanceCategory(adminDbConnection, req, res) {
  try {
    const DanceCategory = await adminDbConnection.model('DanceCategory');
    const danceCategory = await DanceCategory.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!danceCategory) {
      throw new Error('DanceCategory not found');
    }
    return danceCategory._doc;
  } catch (error) {
    throw error;
  }
}

export async function deleteDanceCategory(adminDbConnection, req, res) {
  try {
    const DanceCategory = await adminDbConnection.model('DanceCategory');
    const danceCategory = await DanceCategory.findByIdAndDelete(req.params.id);
    if (!danceCategory) {
      throw new Error('DanceCategory not found');
    }
    return danceCategory;
  } catch (error) {
    throw error;
  }
}
