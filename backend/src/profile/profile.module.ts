import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "src/users/schemas/user.schema";
import { UsersService } from "src/users/users.service";
import { ProfileController } from "./profile.controller";

@Module({
	imports: [
		MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
	],
	controllers: [ProfileController],
	providers: [UsersService],
})
export class ProfileModule {}
