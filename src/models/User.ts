import mongoose from 'mongoose';
import { IUser } from '../interfaces/IUser';

const userSchema = new mongoose.Schema<IUser>(
  {
    email: { type: String, require: true },
    name: { type: String, require: true },
    password: { type: String, require: true },
    avatar: String,
    status: { type: String, require: true },
  },
  { timestamps: true },
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
