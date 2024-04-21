import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firebaseUid: { type: String, required: true, unique: true },
  person: { type: Schema.Types.ObjectId, ref: 'Person', required: true },
});

const User = mongoose.model('User', userSchema);

export default User;
