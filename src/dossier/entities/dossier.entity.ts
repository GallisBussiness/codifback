import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Selectionne } from "src/selectionne/entities/selectionne.entity";

export type DossierDocument = Dossier & Document;

@Schema({timestamps: true})
export class Dossier {

    _id: string;

@Prop({type: String, required: true})
session: string;

@Prop({type: Types.ObjectId,ref: Selectionne.name, required: true,autopopulate: true})
selectionne: string;

@Prop({type: Object, required: true})
mobilier_cite: any;

@Prop({type: Object, required: true})
mobilier_resident: any;

}

export const DossierSchema = SchemaFactory.createForClass(Dossier);
