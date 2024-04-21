import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const personSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  ageCategory: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  studio: {
    type: String,
    required: true,
  },
  identifier: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});

const Person = mongoose.model('Person', personSchema);

export default Person;
