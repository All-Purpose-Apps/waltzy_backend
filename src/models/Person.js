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
    enum: ['novice', 'newcomer', 'associate bronze', 'associate silver', 'associate gold', 'full bronze', 'full silver', 'full gold'],
  },
  studio: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    enum: ['leader', 'follower'],
  },
  identifier: {
    type: String,
    required: true,
    enum: ['student', 'coach', 'teacher/professional'],
  },
});

const Person = mongoose.model('Person', personSchema);

export default Person;
