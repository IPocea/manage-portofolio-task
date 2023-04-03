import { ITableFilters } from "./common.interface";

export interface IUser {
  _id?: string;
  firstName: string;
  lastName: string;
  password?: string;
  email: string;
  website?: string;
  role?: string;
  __v?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserLoginData {
  username: string;
  password: string;
}

export interface IDialogData {
  user?: IUser;
  filters?: ITableFilters;
}