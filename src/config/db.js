import mongoose from 'mongoose';
const URI = process.env.MONGOURI;

mongoose.set('strictQuery', true, 'useNewUrlParser', true);

const db = async () => {
  try {
    await mongoose.connect(URI);
    console.log('MongoDB is Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default db;
