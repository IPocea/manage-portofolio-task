import { IUser } from "src/users/interface/user.interface";

export class UpdatePortofolioWebDto {
	name?: string;
	description?: string;
	portofolioWebUrl?: string;
  isVisible?: boolean;
	addedBy?: IUser;
}