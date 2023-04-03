import { MailerModule } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { Global, Module } from "@nestjs/common";
import { MailService } from "./mail.service";
import { join } from "path";
import { MailController } from "./mail.controller";
import { resolve } from "path";

@Global()
@Module({
	imports: [
		MailerModule.forRootAsync({
			useFactory: () => ({
				transport: {
					host: process.env.MAIL_HOST,
					secure: false,
					auth: {
						user: process.env.MAIL_USER,
						pass: process.env.MAIL_PASSWORD,
					},
				},
				defaults: {
					from: `"No Reply" <${process.env.MAIL_FROM}>`,
				},
				template: {
					dir: join(
						resolve(process.cwd()),
						"src",
						"mail",
						"templates"
					),
					adapter: new HandlebarsAdapter(),
					options: {
						strict: true,
					},
				},
			}),
		}),
	],
	controllers: [MailController],
	providers: [MailService],
	exports: [MailService],
})
export class MailModule {}
