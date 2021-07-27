import { IUserInputDTO } from '../interfaces/IUser';
import User from '../models/User';

const createUser = (data: IUserInputDTO) => {
  const user = new User(data);
  return user.save();
};

const findEmail = async (data: { email: string }) => {
  const user = await User.findOne({ email: data.email });
  return user;
};

export default { createUser, findEmail };
