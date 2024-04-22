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
  heats: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Heat' }],
  },
});

const Couple = mongoose.model('Couple', coupleSchema);

export default Couple;
