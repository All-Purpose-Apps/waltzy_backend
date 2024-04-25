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
  studio: {
    type: Schema.Types.ObjectId,
    ref: 'Studio',
    required: true,
  },
  identifier: {
    type: String,
    required: true,
    enum: ['student', 'coach', 'teacher/professional'],
  },
});

personSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});
personSchema.set('toJSON', { virtuals: true });

const Person = mongoose.model('Person', personSchema);

export default Person;
