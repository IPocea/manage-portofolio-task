import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { IUser } from "src/users/interface/user.interface";

export type PortofolioDocument = Portofolio & Document;

@Schema({ timestamps: true })
export class Portofolio {
	@Prop({ required: true, unique: true })
	name: string;
	@Prop({ required: true })
	description: string;
	@Prop({ required: true })
	portofolioWebUrl: string;
  @Prop({required: true})
  isVisible: boolean;
	@Prop({ required: true, type: Object })
	addedBy: IUser;
	@Prop()
	createdAt?: Date;
}

export const PortofolioSchema = SchemaFactory.createForClass(Portofolio);
