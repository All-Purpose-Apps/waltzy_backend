import mongoose from 'mongoose';

const heatSchema = new mongoose.Schema({
  entries: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Entry' }],
    required: true,
    validate: [arrayLimit, '{PATH} exceeds the limit of 8'],
  },
  dateTime: {
    type: Date,
    required: true,
  },
  dance: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Dance',
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  ageCategory: {
    type: String,
    required: true,
    enum: ['preteen i', 'preteen ii', 'junior', 'a', 'a1', 'a2', 'b', 'b1', 'b2', 'c', 'c1', 'c2', 'c3'],
  },
  level: {
    type: String,
    required: true,
    enum: ['novice', 'newcomer', 'associate bronze', 'associate silver', 'associate gold', 'full bronze', 'full silver', 'full gold'],
  },
});

heatSchema.index({ entries: 1, dance: 1, ageCategory: 1, level: 1 }, { unique: true });

function arrayLimit(val) {
  return val.length <= 8 && val.length > 0;
}
const Heat = mongoose.model('Heat', heatSchema);

export default Heat;
