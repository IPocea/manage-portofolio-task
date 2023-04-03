import { BadRequestException, Injectable } from "@nestjs/common";
import { UsersService } from "../users.service";

// This services are used in verifySignup and verifyModify middlewares
@Injectable()
export class VerifyHelper {
	constructor(private readonly userService: UsersService) {}

	async checkDuplicateEmail(email: string): Promise<void> {
		const user = await this.userService.findOne({
			email: {
				$regex: new RegExp("^" + email.toLowerCase() + "$", "i"),
			},
		});
		if (user) {
			throw new BadRequestException("The email is already in use!");
		}
	}

}
