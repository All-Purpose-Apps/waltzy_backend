import mongoose from 'mongoose';

const heatSchema = new mongoose.Schema({
  couples: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Couple' }],
    required: true,
    validate: [arrayLimit, '{PATH} exceeds the limit of 8'],
  },
  dateTime: {
    type: Date,
    required: true,
  },
});

function arrayLimit(val) {
  return val.length <= 8;
}
const Heat = mongoose.model('Heat', heatSchema);

export default Heat;
