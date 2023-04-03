import {
	BadRequestException,
	Injectable,
	NestMiddleware,
} from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { checkEmptyInputs } from "../../utils/shared-middlewares";
import { Types } from "mongoose";
import { PortofolioService } from "../portofolio.service";

@Injectable()
export class VerifyPorotoflioUpdate implements NestMiddleware {
	constructor(private readonly portofolioService: PortofolioService) {}

	async use(req: Request, res: Response, next: NextFunction) {
		checkEmptyInputs(
			req.body.name,
			req.body.description,
			req.body.portofolioWebUrl,
			req.body.addedBy
		);
		const ObjectId = Types.ObjectId;
		const portofolio = await this.portofolioService.findOne({
			_id: new ObjectId(`${req.params.id}`),
		});
		if (portofolio.name !== req.body.name) {
			const duplicate = await this.portofolioService.findOne({
				name: {
					$regex: new RegExp("^" + req.body.name.toLowerCase() + "$", "i"),
				},
			});
			if (duplicate) {
				throw new BadRequestException(
					`The name ${req.body.name} is already in use!`
				);
			}
		}
		next();
	}
}
