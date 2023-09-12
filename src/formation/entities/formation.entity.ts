import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Departement } from "src/departement/entities/departement.entity";

export type FormationDocument = Formation & Document;

@Schema({timestamps: true})
export class Formation {
    _id: string;

    @Prop({type: String, required: true,unique: true})
    nom: string;

    @Prop({type: Types.ObjectId, ref: Departement.name, required: true,autopopulation: true})
    departement: string;
}


export const FormationSchema = SchemaFactory.createForClass(Formation);