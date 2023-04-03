import {
	Controller,
	Get,
	UseGuards,
	Request
} from "@nestjs/common";
import { IUser } from "src/users/interface/user.interface";
import { AccesTokenGuard } from "../auth/guards/access-token-guard";
import { UsersService } from "../users/users.service";
import { Types } from "mongoose";

@Controller("profile")
export class ProfileController {
	private ObjectId = Types.ObjectId;
	constructor(private readonly usersServices: UsersService) {}

	// Protected routes
	@UseGuards(AccesTokenGuard)
	@Get()
	async getProfile(@Request() req): Promise<IUser> {
		return await this.usersServices.findOneNoPass({
			_id: new this.ObjectId(`${req.user._id}`),
		});
	}

}
