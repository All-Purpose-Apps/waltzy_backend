import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const danceSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  danceCategory: {
    type: Schema.Types.ObjectId,
    ref: 'DanceCategory',
    required: true,
  },
});

const Dance = mongoose.model('Dance', danceSchema);

export default Dance;
