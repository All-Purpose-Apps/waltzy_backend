const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const danceSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'DanceCategory',
    required: true,
  },
});

const Dance = mongoose.model('Dance', danceSchema);
