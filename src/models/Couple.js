import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const coupleSchema = new Schema({
  leader: {
    type: Schema.Types.ObjectId,
    ref: 'Person',
    required: true,
  },
  follower: {
    type: Schema.Types.ObjectId,
    ref: 'Person',
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
  heats: {
    type: [Schema.Types.ObjectId],
    ref: 'Heat',
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

const Couple = mongoose.model('Couple', coupleSchema);

export default Couple;
