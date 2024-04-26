import Dance from '../models/Dance.js';

export async function getAllDances(req, res) {
  const page = parseInt(req.query._page, 10) || 1;
  const perPage = parseInt(req.query._limit, 10) || 10;
  const skip = (page - 1) * perPage;
  const sortField = req.query._sort.split('.')[0] || 'name'; // Default sort field
  const sortOrder = req.query._order === 'DESC' ? -1 : 1;
  const sortOptions = {};
  sortOptions[sortField] = sortOrder;
  try {
    const dances = await Dance.find({}).sort(sortOptions).skip(skip).limit(perPage).populate('danceCategory');

    const transformedItems = dances.map((item) => ({
      id: item._id, // Map _id to id
      ...item._doc, // Spread the rest of the item
    }));
    const count = await Dance.countDocuments();
    res.header('X-Total-Count', `${count}`);
    res.json(transformedItems);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function createDance(req, res) {
  console.log(req.body);
  try {
    const newDance = new Dance(req.body);
    await newDance.save();
    res.status(201).json({ id: newDance._id, ...newDance._doc });
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function getDance(req, res) {
  try {
    const dance = await Dance.findById(req.params.id).populate('danceCategory');
    if (!dance) {
      return res.status(404).json({ message: 'Dance not found' });
    }
    res.json({ id: dance._id, ...dance._doc });
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function getDancesByCategory(req, res) {
  try {
    const dance = await Dance.find({ danceCategory: req.params.id });
    const transformedItems = dance.map((item) => ({
      id: item._id, // Map _id to id
      ...item._doc, // Spread the rest of the item
    }));
    if (!dance) {
      return res.status(404).json({ message: 'Dance Category not found' });
    }

    res.json({ data: transformedItems, total: transformedItems.length });
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function updateDance(req, res) {
  try {
    const dance = await Dance.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!dance) {
      return res.status(404).json({ message: 'Dance not found' });
    }
    res.json(dance);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function deleteDance(req, res) {
  try {
    const dance = await Dance.findByIdAndDelete(req.params.id);
    if (!dance) {
      return res.status(404).json({ message: 'Dance not found' });
    }
    res.json({ message: 'Dance deleted successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
}
