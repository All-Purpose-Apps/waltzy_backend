const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const danceCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true, // Ensure no duplicate categories
    trim: true, // Remove whitespace from both ends of the string
  },
});

const DanceCategory = mongoose.model('DanceCategory', danceCategorySchema);
