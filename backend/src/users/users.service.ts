import { BadRequestException, Injectable } from "@nestjs/common";
import { IUser } from "./interface/user.interface";
import * as bcrypt from "bcrypt";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Model } from "mongoose";
import { CreateUserDto, UpdateUserDto } from "./dto";


@Injectable()
export class UsersService {
	constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
	async create(newUser: CreateUserDto): Promise<IUser> {
		try {
			newUser.password = bcrypt.hashSync(newUser.password, 8);
			const createdUser = new this.userModel(newUser);
			const user = await createdUser.save();
			return {
				_id: user._id,
				firstName: user.firstName,
				lastName: user.lastName,
				email: user.email,
				website: user.website,
				role: user.role,
			};
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	async findOne(query: object): Promise<IUser> {
		try {
			const user = await this.userModel.findOne(query);
			return user;
		} catch (error) {
			return null;
		}
	}

	// find an user and return it without password
	async findOneNoPass(query: object): Promise<IUser> {
		try {
			const user = await this.userModel.findOne(query).select("-password");
			return user;
		} catch (error) {
			return null;
		}
	}

	async findUserPassword(query: object): Promise<string> {
		try {
			const user = await this.userModel.findOne(query).select("password");
			return user.password;
		} catch (error) {
			return null;
		}
	}

	async update(
		userId: string,
		user: UpdateUserDto
	): Promise<{ message: string }> {
		try {
			await this.userModel.updateOne({ _id: userId }, user);
			return { message: `Userul cu id-ul ${userId} a fost actualizat` };
		} catch (error) {
			return null;
		}
	}

	async checkOldPassword(userId: string, password: string): Promise<boolean> {
		try {
			const oldPassword = await this.findUserPassword({
				_id: userId,
			});
			const passwordValid = bcrypt.compareSync(password, oldPassword);
			return passwordValid;
		} catch (error) {
			return null;
		}
	}
}
