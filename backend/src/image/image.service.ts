import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ImageDocument, ImageClass } from "./schemas/image.schema";
import { Model, Types } from "mongoose";
import { CreateImageDto } from "./dto";
import { IMessageResponse, IQueryParams } from "src/utils/shared-interface";
import { IImage, IImagePagination } from "./interface/image.interface";
import { getImagePagination } from "./utils/image-pagination";
import { selectOsAndUnlink } from "./utils/select-os-and-unlink";

@Injectable()
export class ImageService {
	constructor(
		@InjectModel(ImageClass.name)
		private imageModel: Model<ImageDocument>
	) {}

	async findAllOfPortofolioWeb(
		query: IQueryParams,
		portofolioWebId: Types.ObjectId
	): Promise<IImagePagination> {
		return await getImagePagination(this.imageModel, query, portofolioWebId);
	}

	async create(newImage: CreateImageDto): Promise<IImage> {
		try {
			const createdImage = new this.imageModel(newImage);
			await createdImage.save();
			return createdImage;
		} catch (error) {
			return null;
		}
	}

	async deleteOne(imageId: Types.ObjectId): Promise<IMessageResponse> {
		try {
			const image = await this.imageModel.findOne({ _id: imageId });
			const result = await this.imageModel.deleteOne({ _id: imageId });
			if (result) {
				await selectOsAndUnlink(image.path);
				return { message: "The image was successfully deleted" };
			} else {
				return null;
			}
		} catch (error) {
			null;
		}
	}

	async deleteMany(portofolioWebId: Types.ObjectId): Promise<IMessageResponse> {
		try {
			const images = await this.imageModel.find({
				portofolioWebId: portofolioWebId,
			});
			const result = await this.imageModel.deleteMany({
				portofolioWebId: portofolioWebId,
			});
			if (result) {
				for (const image of images) {
					await selectOsAndUnlink(image.path);
				}
				return { message: "All images of the portofolio website were deleted" };
			}
		} catch (error) {
			return null;
		}
	}
}
