import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { IUser } from "src/users/interface/user.interface";

export type ImageDocument = ImageClass & Document;

@Schema({ timestamps: true })
export class ImageClass {
	@Prop({ required: true })
	name: string;
	@Prop({ required: true })
	mimeType: string;
	@Prop({ required: true })
	path: string;
	@Prop({ required: true })
	portofolioWebId: Types.ObjectId;
	@Prop({ required: true, type: Object })
	addedBy: IUser;
	@Prop()
	createdAt?: Date;
}

export const ImageSchema = SchemaFactory.createForClass(ImageClass);
