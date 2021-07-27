import mongoose from 'mongoose';
import User from '../models/User';

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log(`MongoDB Connected... 🚀 `);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
