import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const entrySchema = new Schema({
  leader: {
    type: Schema.Types.ObjectId,
    ref: 'Dancer',
    required: true,
  },
  follower: {
    type: Schema.Types.ObjectId,
    ref: 'Dancer',
    required: true,
  },
  dance: {
    type: Schema.Types.ObjectId,
    ref: 'Dance',
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

entrySchema.index({ leader: 1, follower: 1, dance: 1, ageCategory: 1, level: 1 }, { unique: true });

const Entry = mongoose.model('Entry', entrySchema);

export default Entry;
