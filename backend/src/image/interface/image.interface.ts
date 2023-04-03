import { Types } from "mongoose";
import { IUser } from "src/users/interface/user.interface";

export interface IImagePagination {
	data: IImage[];
	pageIndex: number;
	pageSize: number;
	totalItems: number;
}

export interface IImage {
	_id?: Types.ObjectId;
	name: string;
	mimeType: string;
	path: string;
	portofolioWebId: Types.ObjectId;
	addedBy: IUser;
	createdAt?: Date;
	updatedAt?: Date;
	__v?: 0;
}
