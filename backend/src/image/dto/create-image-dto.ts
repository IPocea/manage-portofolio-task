import { Types } from "mongoose";
import { IUser } from "src/users/interface/user.interface";

export class CreateImageDto {
  name: string;
	mimeType: string;
	path: string;
	portofolioWebId: Types.ObjectId;
	addedBy: IUser;
	createdAt?: Date;
}