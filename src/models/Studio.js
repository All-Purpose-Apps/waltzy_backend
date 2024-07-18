import mongoose from 'mongoose';
import Person from './Person.js';

const studioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  contactPerson: {
    type: String,
  },
  contactPersonPhone: {
    type: String,
  },
  contactPersonEmail: {
    type: String,
  },
  studioType: {
    type: String,
    required: true,
    enum: ['independent', 'franchise'],
  },
  studioOwner: {
    type: String,
  },
  studioOwnerPhone: {
    type: String,
  },
  studioOwnerEmail: {
    type: String,
  },
  studioManager: {
    type: String,
  },
  studioManagerPhone: {
    type: String,
  },
  studioManagerEmail: {
    type: String,
  },
  associatedDancers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: Person,
  },
});

const Studio = mongoose.model('Studio', studioSchema);

export default Studio;
