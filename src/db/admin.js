import mongoose from 'mongoose';
mongoose.Promise = global.Promise;
import Studio from '../dbModel/Studio.js';
import Tenant from '../dbModel/Tenant.js';
import User from '../dbModel/User.js';
import Dancer from '../dbModel/Dancer.js';
import Entry from '../dbModel/Entry.js';
import Dance from '../dbModel/Dance.js';
import DanceCategory from '../dbModel/DanceCategory.js';
import Heat from '../dbModel/Heat.js';
import Schedule from '../dbModel/Schedule.js';

const clientOption = {
  socketTimeoutMS: 30000,
  keepAlive: true,
  poolSize: 5,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', () => {
  console.log('Mongoose default connection open');
});

// If the connection throws an error
mongoose.connection.on('error', (err) => {
  console.log('Mongoose default connection error: ' + err);
});

// When the connection is disconnected
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

export const initAdminDbConnection = (DB_URL) => {
  try {
    const db = mongoose.createConnection(DB_URL, clientOption);

    db.on('error', console.error.bind(console, 'initAdminDbConnection MongoDB Connection Error>> : '));
    db.once('open', () => {
      console.log('initAdminDbConnection client MongoDB Connection ok!');
    });

    // require all schemas !?
    Studio;
    Tenant;
    User;
    Dancer;
    Entry;
    Dance;
    DanceCategory;
    Heat;
    Schedule;
    return db;
  } catch (error) {
    console.log('initAdminDbConnection error', error);
  }
};
