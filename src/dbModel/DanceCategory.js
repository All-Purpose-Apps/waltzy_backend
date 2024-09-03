import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const danceCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensure no duplicate categories
    trim: true, // Remove whitespace from both ends of the string
  },
  turnedOn: {
    type: Boolean,
    default: true,
  },
});

const DanceCategory = mongoose.model('DanceCategory', danceCategorySchema);

export default DanceCategory;
