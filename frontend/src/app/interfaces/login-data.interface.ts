import { IUser } from './user.interface';

export interface ILoginDataBehavior {
  loginStatus: boolean;
  user: IUser;
}
