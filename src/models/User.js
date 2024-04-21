const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firebaseUid: { type: String, required: true, unique: true },
  person: { type: Schema.Types.ObjectId, ref: 'Person', required: true },
});

module.exports = mongoose.model('User', userSchema);
