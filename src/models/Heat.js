import mongoose from 'mongoose';

const heatSchema = new mongoose.Schema({
  couples: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Couple' }],
    required: true,
  },
  judgeNumber: {
    type: Number,
    required: true,
  },
  competitions: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dance' }],
    required: true,
  },
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
