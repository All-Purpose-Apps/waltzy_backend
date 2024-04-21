const Person = require('../models/Person');

exports.getAllPeople = async (req, res) => {
  try {
    const people = await Person.find();
    res.json(people);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.createPerson = async (req, res) => {
  try {
    const newPerson = new Person(req.body);
    await newPerson.save();
    res.status(201).json(newPerson);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getPerson = async (req, res) => {
  try {
    const person = await Person.findById(req.params.id);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(person);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.updatePerson = async (req, res) => {
  try {
    const person = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json(person);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.deletePerson = async (req, res) => {
  try {
    const person = await Person.findByIdAndDelete(req.params.id);
    if (!person) {
      return res.status(404).json({ message: 'Person not found' });
    }
    res.json({ message: 'Person deleted successfully' });
  } catch (error) {
    res.status(500).json(error);
  }
};
