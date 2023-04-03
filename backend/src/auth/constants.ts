import * as dotenv from "dotenv";
dotenv.config();

export const jwtConstants = {
	accessTokenSecret: process.env.accessTokenSecret,
	refreshTokenSecret: process.env.refreshTokenSecret,
	resetTokenSecret: process.env.resetTokenSecret,
	accessTokenExpirationTime: process.env.accessTokenExpirationTime,
	refreshTokenExpirationTime: process.env.refreshTokenExpirationTime,
	resetTokenExpirationTime: process.env.resetTokenExpirationTime,
};
