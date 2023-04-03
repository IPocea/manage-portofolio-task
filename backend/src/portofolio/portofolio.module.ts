import { MiddlewareConsumer, Module, RequestMethod } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { PortofolioController } from "./portofolio.controller";
import { PortofolioService } from "./portofolio.service";
import { Portofolio, PortofolioSchema } from "./schemas/portofolio.schema";
import { VerifyPorotoflioUpdate, VerifyPortofolioCreate } from "./middleware";
import { ImageClass, ImageSchema } from "src/image/schemas/image.schema";
import { ImageModule } from "src/image/image.module";

@Module({
	imports: [
		ImageModule,
		MongooseModule.forFeature([
			{ name: ImageClass.name, schema: ImageSchema },
			{ name: Portofolio.name, schema: PortofolioSchema },
		]),
	],
	controllers: [PortofolioController],
	providers: [PortofolioService],
	exports: [PortofolioService],
})
export class PortofolioModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(VerifyPortofolioCreate)
			.forRoutes({ path: "portofolios/add", method: RequestMethod.POST });
		consumer.apply(VerifyPorotoflioUpdate).forRoutes({
			path: "portofolios/:id/edit-portofolio",
			method: RequestMethod.PATCH,
		});
	}
}
