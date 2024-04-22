import mongoose from 'mongoose';

const heatSchema = new mongoose.Schema({
  couples: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Couple' }],
    required: true,
  },
  competitions: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dance' }],
    required: true,
  },
});

const Heat = mongoose.model('Heat', heatSchema);

export default Heat;
