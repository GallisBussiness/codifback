import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type DossierDocument = Dossier & Document;

@Schema({timestamps: true})
export class Dossier {
@Prop({type: String, required: true})
session: string;

@Prop({type: String, required: true})
inscription: string;

@Prop({type: Object, required: true})
mobilier_cite: any;

@Prop({type: Object, required: true})
mobilier_resident: any;

@Prop({type: Object, required: true})
paiements: any;
}

export const DossierSchema = SchemaFactory.createForClass(Dossier);
