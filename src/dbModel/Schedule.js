import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const scheduleSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  heats: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Heat' }],
  },
  dances: {
    type: [{ type: Schema.Types.ObjectId, ref: 'Dance' }],
    required: true,
  },
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

export default Schedule;
