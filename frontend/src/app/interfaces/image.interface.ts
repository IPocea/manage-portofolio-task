import { IUser } from "./user.interface";

export interface IImagePagination {
	data: IImage[];
	pageIndex: number;
	pageSize: number;
	totalItems: number;
}

export interface IImage {
	_id?: string;
	name: string;
	mimeType: string;
	path: string;
	portofolioWebId: string;
	addedBy: IUser;
	createdAt?: string;
	updatedAt?: string;
	__v?: 0;
}