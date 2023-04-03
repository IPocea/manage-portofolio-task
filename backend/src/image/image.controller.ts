import {
	BadRequestException,
	Controller,
	Delete,
	Get,
	Param,
	ParseFilePipe,
	Post,
	Query,
	Request,
	Res,
	UploadedFiles,
	UseGuards,
	UseInterceptors,
} from "@nestjs/common";
import { FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { AccesTokenGuard } from "src/auth/guards/access-token-guard";
import {
	FileTypeCustomValidator,
	MaxFileSizeCustomValidator,
} from "./validators";
import * as path from "path";
import { Model, Types } from "mongoose";
import { IQueryParams } from "src/utils/shared-interface";
import { ImageService } from "./image.service";
import { IImage, IImagePagination } from "./interface/image.interface";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "src/users/schemas/user.schema";

@Controller("images")
export class ImageController {
	private ObjectId = Types.ObjectId;
	constructor(
		@InjectModel(User.name)
		private readonly userModel: Model<UserDocument>,
		private readonly imageService: ImageService
	) {}

	@UseGuards(AccesTokenGuard)
	@Post("upload/:portofolioWebId")
	@UseInterceptors(
		FilesInterceptor("files", 10, {
			storage: diskStorage({
				destination: path.join(process.cwd(), "public", "files"),
			}),
		})
	)
	async uploadDocument(
		@UploadedFiles(
			new ParseFilePipe({
				validators: [
					new FileTypeCustomValidator({
						fileType: /image\/*/,
					}),
					new MaxFileSizeCustomValidator({ maxSize: 1024 * 1024 * 4 }),
				],
			})
		)
		files: Array<Express.Multer.File>,
		@Param("portofolioWebId") portofolioWebId: string,
		@Query() query: IQueryParams,
		@Request() req
	): Promise<IImagePagination> {
		if (!files.length) {
			throw new BadRequestException("There are no files");
		}
		const user = await this.userModel
			.findOne({
				_id: new this.ObjectId(`${req.user._id}`),
			})
			.select("-password");
		for (const file of files) {
			const image: IImage = {
				name: file.originalname,
				mimeType: file.mimetype,
				path: file.path.slice(file.path.lastIndexOf("\\") + 1),
				portofolioWebId: new this.ObjectId(`${portofolioWebId}`),
				addedBy: user,
			};
			await this.imageService.create(image);
		}
		return await this.imageService.findAllOfPortofolioWeb(
			query,
			new this.ObjectId(`${portofolioWebId}`)
		);
	}

	@UseGuards(AccesTokenGuard)
	@Get(":portofolioWebId/get-all-of-portofolio")
	async getImagesOfPortofolioWeb(
		@Param("portofolioWebId") portofolioWebId: string,
		@Query() query: IQueryParams
	): Promise<IImagePagination> {
		return await this.imageService.findAllOfPortofolioWeb(
			query,
			new this.ObjectId(`${portofolioWebId}`)
		);
	}

	@Get(":imageId/get-image")
	async showImages(@Param("imageId") imageId, @Res() res): Promise<any> {
		const os = process.platform;
		switch (os) {
			case "win32":
				return res.sendFile(imageId, {
					root: path.join(path.resolve(process.cwd(), "public", "files")),
				});
			case "linux":
				return res.sendFile(imageId, {
					root: path.resolve(process.cwd()),
				});
			default:
				return res.sendFile(imageId, {
					root: path.join(path.resolve(process.cwd(), "public", "files")),
				});
		}
	}

	@UseGuards(AccesTokenGuard)
	@Delete(":portofolioWebId/:imageId")
	async deleteDocument(
		@Param("portofolioWebId") portofolioWebId: string,
		@Param("imageId") imageId: string,
		@Query() query: IQueryParams
	): Promise<IImagePagination> {
		try {
			const result = await this.imageService.deleteOne(
				new this.ObjectId(`${imageId}`)
			);
			if (result) {
				return await this.imageService.findAllOfPortofolioWeb(
					query,
					new this.ObjectId(`${portofolioWebId}`)
				);
			}
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}
}
