import { IImage } from "./image.interface";
import { IUser } from "./user.interface";

export interface IPortofolioPagination {
  data: IPortofolioWeb[];
  pageIndex: number;
  pageSize: number;
  totalItems: number;
}

export interface IPortofolioWeb {
  _id?: string;
  name: string;
	description: string;
	portofolioWebUrl: string;
  isVisible: boolean;
  addedBy: IUser;
	images?: IImage[];
	createdAt?: string;
  updatedAt?: string;
  __v?: number;
}