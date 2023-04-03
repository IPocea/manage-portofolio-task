import { Types } from "mongoose";
import { IImage } from "src/image/interface/image.interface";

export interface IPortofolioPagination {
	data: IPortofolioWeb[];
	pageIndex: number;
	pageSize: number;
	totalItems: number;
}

export interface IPortofolioWeb {
	_id?: Types.ObjectId;
	name: string;
	description: string;
	portofolioWebUrl: string;
  isVisible: boolean;
	images?: IImage[];
	createdAt?: Date;
	updatedAt?: Date;
	__v?: number;
}
