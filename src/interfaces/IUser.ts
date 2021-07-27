export interface IUser {
  email: string;
  name: string;
  password: string;
  avatar: string;
  status: 'live' | 'removed';
  createdDate: string;
}

export interface IUserInputDTO {
  email: string;
  name: string;
  password: string;
  avatar: string;
  status: 'live' | 'removed';
}
