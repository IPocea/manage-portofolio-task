import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Portofolio, PortofolioDocument } from "./schemas/portofolio.schema";
import { Model, Types } from "mongoose";
import { CreatePortofolioWebDto, UpdatePortofolioWebDto } from "./dto";
import { IQueryParams } from "src/utils/shared-interface";
import {
	IPortofolioWeb,
	IPortofolioPagination,
} from "./interface/portofolio.interface";
import { portofolioObjKeysForSearch } from "./utils/portofolio-web-obj-keys";
import { getPortofolioPagination } from "./utils/portofolio-web-pagination";
import { ImageService } from "src/image/image.service";
import { portofolioWebAggregationArray } from "./utils/portofolio-web-aggr-array";

@Injectable()
export class PortofolioService {
	constructor(
		@InjectModel(Portofolio.name)
		private readonly portofolioModel: Model<PortofolioDocument>,
		private readonly imageService: ImageService
	) {}

	async create(
		newPortofolioWeb: CreatePortofolioWebDto,
		query: IQueryParams
	): Promise<IPortofolioPagination> {
		try {
			const createdPortofolioWeb = new this.portofolioModel(newPortofolioWeb);
			await createdPortofolioWeb.save();
			const filters = {
				pageIndex: "0",
				pageSize: query?.pageSize?.toString() || "10",
			};
			return await getPortofolioPagination(
				this.portofolioModel,
				filters,
				portofolioObjKeysForSearch
			);
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	async findAll(query: IQueryParams): Promise<IPortofolioPagination> {
		return await getPortofolioPagination(
			this.portofolioModel,
			query,
			portofolioObjKeysForSearch
		);
	}

	async findAllVisibleWithNoFilters(): Promise<IPortofolioWeb[]> {
		const aggrArray: any = [...portofolioWebAggregationArray];
		aggrArray.unshift({ $match: { isVisible: true } });
		return await this.portofolioModel.aggregate(aggrArray);
	}

	async findOne(query: object): Promise<IPortofolioWeb> {
		try {
			const portofolio = await this.portofolioModel.findOne(query);
			return portofolio;
		} catch (error) {
			return null;
		}
	}

	async updateOne(
		portofolioWebId: Types.ObjectId,
		updatePortofolioWebDto: UpdatePortofolioWebDto,
		query: IQueryParams
	): Promise<IPortofolioPagination> {
		try {
			await this.portofolioModel.updateOne(
				{ _id: portofolioWebId },
				updatePortofolioWebDto
			);
			return await getPortofolioPagination(
				this.portofolioModel,
				query,
				portofolioObjKeysForSearch
			);
		} catch (error) {
			return null;
		}
	}

	async findOneAndUpdate(
		portofolioWebId: Types.ObjectId,
		updatePortofolioWebDto: UpdatePortofolioWebDto
	): Promise<IPortofolioWeb> {
		const updatedPortofolio = await this.portofolioModel.findByIdAndUpdate(
			{
				_id: portofolioWebId,
			},
			updatePortofolioWebDto,
			{ new: true }
		);
		return updatedPortofolio;
	}

	async toogleVisibility(
		portofolioWebId: Types.ObjectId,
		updatePortofolioWebDto: UpdatePortofolioWebDto,
		query: IQueryParams
	): Promise<IPortofolioPagination> {
		try {
			await this.portofolioModel.updateOne(
				{ _id: portofolioWebId },
				{ isVisible: updatePortofolioWebDto.isVisible }
			);
			return await getPortofolioPagination(
				this.portofolioModel,
				query,
				portofolioObjKeysForSearch
			);
		} catch (error) {
			return null;
		}
	}

	async deleteOne(
		portofolioWebId: Types.ObjectId,
		query: IQueryParams
	): Promise<IPortofolioPagination> {
		try {
			await this.imageService.deleteMany(portofolioWebId);
			await this.portofolioModel.deleteOne({
				_id: portofolioWebId,
			});
			return await getPortofolioPagination(
				this.portofolioModel,
				query,
				portofolioObjKeysForSearch
			);
		} catch (error) {
			return null;
		}
	}
}
