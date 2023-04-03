import { IUser } from "src/users/interface/user.interface";

export class CreatePortofolioWebDto {
	name: string;
	description: string;
	portofolioWebUrl: string;
  isVisible: boolean;
	addedBy?: IUser;
	createdAt?: Date;
}