export async function getAllStudios(adminDbConnection) {
  try {
    const Studio = await adminDbConnection.model('Studio');
    const studios = await Studio.find({});
    console.log('getAllStudios studios', studios);
    return studios;
  } catch (error) {
    console.log('getAllStudios error', error);
    throw error;
  }
}

export async function createStudio(adminDbConnection, req, res) {
  try {
    const Studio = await adminDbConnection.model('Studio');
    const newStudio = new Studio(req.body);
    await newStudio.save();
    const studios = await Studio.find({});
    return studios;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function getStudio(adminDbConnection, req, res) {
  try {
    const Studio = await adminDbConnection.model('Studio');
    const results = await Studio.find({ _id: req.params.id });
    const Dancer = await adminDbConnection.model('Dancer');
    const dancersInStudio = await Dancer.find({ studio: { $in: req.params.id } });
    if (!results) {
      throw new Error('Studio not found');
    }
    const studio = { ...results, dancers: dancersInStudio };
    return studio;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function updateStudio(adminDbConnection, req, res) {
  try {
    const Studio = await adminDbConnection.model('Studio');
    const studio = await Studio.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!studio) {
      throw new Error('Studio not found');
    }
    return studio._doc;
  } catch (error) {
    throw error;
  }
}

export async function deleteStudio(adminDbConnection, req, res) {
  try {
    const Dancer = await adminDbConnection.model('Dancer');
    const Studio = await adminDbConnection.model('Studio');
    const dancersInStudio = await Dancer.find({ studio: { $in: req.params.id } });
    if (dancersInStudio.length > 0) {
      throw new Error('Cannot delete studio with dancers in it');
    } else {
      const studio = await Studio.deleteMany({ _id: { $in: req.params.id } });
      if (!studio) {
        throw new Error('Studio not found');
      }
    }
    const studios = await Studio.find({});
    return studios;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
