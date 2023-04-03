import {
	Controller,
	UseGuards,
	Get,
	Query,
	Param,
	NotFoundException,
	Post,
	Body,
	BadRequestException,
	Patch,
	Delete,
	Request,
} from "@nestjs/common";
import { PortofolioService } from "./portofolio.service";
import { Types } from "mongoose";
import { AccesTokenGuard } from "src/auth/guards/access-token-guard";
import { IQueryParams } from "src/utils/shared-interface";
import {
	IPortofolioWeb,
	IPortofolioPagination,
} from "./interface/portofolio.interface";
import { CreatePortofolioWebDto, UpdatePortofolioWebDto } from "./dto";

@Controller("portofolios")
export class PortofolioController {
	private ObjectId = Types.ObjectId;
	constructor(private readonly portofolioService: PortofolioService) {}

	@Get()
	async findAllNoPagination(): Promise<IPortofolioWeb[]> {
		return await this.portofolioService.findAllVisibleWithNoFilters();
	}

	@UseGuards(AccesTokenGuard)
	@Get("with-pagination")
	async findAllWithPagination(
		@Query() query: IQueryParams
	): Promise<IPortofolioPagination> {
		return await this.portofolioService.findAll(query);
	}

	@UseGuards(AccesTokenGuard)
	@Get(":id")
	async findOne(@Param("id") portofolioWebId: string): Promise<IPortofolioWeb> {
		const portofolio = await this.portofolioService.findOne({
			_id: new this.ObjectId(`${portofolioWebId}`),
		});
		if (!portofolio)
			throw new NotFoundException(
				`I could not find the portofolio with the id ${portofolioWebId}`
			);
		return portofolio;
	}

	@UseGuards(AccesTokenGuard)
	@Post("add")
	async add(
		@Query() query: IQueryParams,
		@Body() portofolioWeb: CreatePortofolioWebDto
	): Promise<IPortofolioPagination> {
		try {
			return await this.portofolioService.create(portofolioWeb, query);
		} catch (error) {
			throw new BadRequestException(error.message);
		}
	}

	@UseGuards(AccesTokenGuard)
	@Patch(":id/edit-portofolio")
	async editPortofolio(
		@Param("id") portofolioWebId: string,
		@Query() query: IQueryParams,
		@Body() updatePortofolioDto: UpdatePortofolioWebDto
	): Promise<IPortofolioPagination> {
		const result = await this.portofolioService.updateOne(
			new this.ObjectId(`${portofolioWebId}`),
			updatePortofolioDto,
			query
		);
		if (!result) {
			throw new BadRequestException();
		}
		return result;
	}

	@UseGuards(AccesTokenGuard)
	@Patch(":id/update-visibility")
	async updateVisibility(
		@Param("id") portofolioWebId: string,
		@Query() query: IQueryParams,
		@Body() updatePortofolioDto: UpdatePortofolioWebDto
	): Promise<IPortofolioPagination> {
		const result = await this.portofolioService.toogleVisibility(
			new this.ObjectId(`${portofolioWebId}`),
			updatePortofolioDto,
			query
		);
		if (!result) {
			throw new BadRequestException();
		}
		return result;
	}

	@UseGuards(AccesTokenGuard)
	@Delete(":id")
	async deleteOne(
		@Request() req,
		@Param("id") portofolioWebId: string,
		@Query() query: IQueryParams
	): Promise<IPortofolioPagination> {
		const result = await this.portofolioService.deleteOne(
			new this.ObjectId(`${portofolioWebId}`),
			query
		);
		if (!result)
			throw new NotFoundException(
				`I could not delete the portofolio with the id ${portofolioWebId}. Maybe this portofolio does not exist`
			);
		return result;
	}
}
