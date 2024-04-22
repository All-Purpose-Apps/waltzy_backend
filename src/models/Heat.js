import mongoose from 'mongoose';
import Person from '../models/Person.js';
// import Competition from '../models/Competition.js';
import Dance from '../models/Dance.js';

const heatSchema = new mongoose.Schema({
  leader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Person,
    required: true,
  },
  follower: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Person,
    required: true,
  },
  judgeNumber: {
    type: Number,
    required: true,
  },
  dance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: Dance,
    required: true,
  },
  // competition: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: Competition,
  //   required: true,
  // },
  scores: {
    type: [Number],
  },
  placements: {
    type: [Number],
  },
  penalties: {
    type: [String],
  },
  deductions: {
    type: [String],
  },
  comments: {
    type: [String],
  },
});

const Heat = mongoose.model('Heat', heatSchema);

export default Heat;
