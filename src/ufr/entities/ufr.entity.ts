import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UfrDocument = Ufr & Document;

@Schema({timestamps: true})
export class Ufr {
_id: string;

@Prop({type: String, required: true,unique: true})
nom: string;
}


export const UfrSchema = SchemaFactory.createForClass(Ufr);