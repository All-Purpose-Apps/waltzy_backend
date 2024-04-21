import Person from '../models/Person.js';

export async function getAllPeople(req, res) {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (error) {
    res.status(500).send(error);
  }
}

export async function createPerson(req, res) {
  try {
    const newPerson = new Person(req.body);
    await newPerson.save();
    res.status(201).json(newPerson);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function getPerson(req, res) {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(person);
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
    res.json(person);
  } catch (error) {
    res.status(400).json(error);
  }
}

export async function deletePerson(req, res) {
  try {
    const person = await Person.findByIdAndDelete(req.params.id);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json({ message: 'Person deleted successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
}
