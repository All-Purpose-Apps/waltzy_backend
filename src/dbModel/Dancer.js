import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const dancerSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  middleInitial: {
    type: String,
    default: '',
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  studio: {
    type: Schema.Types.ObjectId,
    ref: 'Studio',
    required: true,
  },
  identifier: {
    type: String,
    required: true,
    enum: ['student', 'coach', 'professional'],
  },
  number: {
    type: Number,
  },
});

dancerSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.middleInitial} ${this.lastName}`;
});
dancerSchema.set('toJSON', { virtuals: true });

dancerSchema.index({ firstName: 1, lastName: 1 }, { unique: true });

const Dancer = mongoose.model('Dancer', dancerSchema);

export default Dancer;
