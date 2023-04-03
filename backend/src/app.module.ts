import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { TokenModule } from "./token/token.module";
import { AuthModule } from "./auth/auth.module";
import { ProfileModule } from "./profile/profile.module";
import { MailModule } from "./mail/mail.module";
import { RegistrationModule } from "./registration/registration.module";
import { PortofolioModule } from "./portofolio/portofolio.module";
import { MulterModule } from "@nestjs/platform-express";
import { ImageModule } from "./image/image.module";
import * as path from "path";

@Module({
	imports: [
		UsersModule,
		TokenModule,
		AuthModule,
		RegistrationModule,
		ProfileModule,
		PortofolioModule,
		MailModule,
		ImageModule,
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (config: ConfigService) => ({
				uri: config.get<string>("mongoDB"), // Loaded from .ENV
			}),
		}),
		ConfigModule.forRoot({
			isGlobal: true,
		}),
		MulterModule.registerAsync({
			useFactory: () => ({
				dest: path.join(process.cwd(), "public", "files"),
			}),
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
