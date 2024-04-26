import Person from '../models/Person.js';

export async function getAllPeople(req, res) {
  const page = parseInt(req.query._page, 10) || 1;
  const perPage = parseInt(req.query._limit, 10) || 10;
  const skip = (page - 1) * perPage;
  const sortField = req.query._sort.split('.')[0] || 'firstName'; // Default sort field
  const sortOrder = req.query._order === 'DESC' ? -1 : 1;
  const sortOptions = {};
  sortOptions[sortField] = sortOrder;

  try {
    const results = await Person.find().sort(sortOptions).skip(skip).limit(perPage);
    const transformedItems = results.map((item) => ({
      id: item._id, // Map _id to id
      ...item._doc, // Spread the rest of the item
    }));
    const count = await Person.countDocuments();
    res.header('X-Total-Count', `${count}`);
    res.json(transformedItems);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function createPerson(req, res) {
  console.log(req.body);
  try {
    const newPerson = new Person(req.body);
    await newPerson.save();
    res.status(201).json({ id: newPerson._id, ...newPerson._doc });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

export async function getPerson(req, res) {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json({ id: person._id, ...person._doc });
  } catch (error) {
    res.status(500).json(error);
  }
}

export async function updatePerson(req, res) {
  try {
    const person = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json({ id: person._id, ...person._doc });
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function deletePerson(req, res) {
  const resultArray = req.params.id.split(',');
  try {
    const person = await Person.deleteMany({ _id: { $in: resultArray } });
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json({ message: 'Person deleted successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
}
