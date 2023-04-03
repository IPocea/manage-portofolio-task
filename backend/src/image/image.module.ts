import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ImageService } from "./image.service";
import { ImageController } from "./image.controller";
import { ImageClass, ImageSchema } from "./schemas/image.schema";
import { User, UserSchema } from "src/users/schemas/user.schema";

@Module({
	imports: [
		MongooseModule.forFeature([
			{ name: ImageClass.name, schema: ImageSchema },
			{ name: User.name, schema: UserSchema },
		]),
	],
	controllers: [ImageController],
	providers: [ImageService],
	exports: [ImageService],
})
export class ImageModule {}
