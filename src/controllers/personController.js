import Person from '../models/Person.js';
import Couple from '../models/Couple.js';

export async function getAllPeople(req, res) {
  try {
    const results = await Person.find().populate('studio');
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function getMultiplePeople(req, res) {
  const resultArray = req.query.id.split(',');
  try {
    const results = await Person.find({ _id: { $in: resultArray } });
    const transformedItems = results.map((item) => ({
      id: item._id, // Map _id to id
      ...item._doc, // Spread the rest of the item
    }));
    res.json(transformedItems);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
}

export async function createPerson(req, res) {
  try {
    const newPerson = new Person(req.body);
    await newPerson.save();
    res.status(201).json(newPerson);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
}

export async function getPerson(req, res) {
  const resultArray = req.params.id.split(',');
  try {
    const results = await Person.find({ _id: { $in: resultArray } }).populate('studio');
    if (!results) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(results);
  } catch (error) {
    console.log(error);
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
  try {
    const existingCouples = await Couple.find({
      $or: [{ follower: { $in: req.params.id } }, { leader: { $in: req.params.id } }],
    });
    if (existingCouples.length > 0) {
      return res.status(400).json({ message: 'Cannot delete person as they are part of a couple' });
    }
    const person = await Person.deleteMany({ _id: { $in: req.params.id } });
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    const results = await Person.find().populate('studio');
    res.json(results);
  } catch (error) {
    res.status(500).json(error);
  }
}
