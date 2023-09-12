import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Ufr } from "src/ufr/entities/ufr.entity";

export type DepartementDocument = Departement & Document;

@Schema({timestamps: true})
export class Departement {
    _id: string;

    @Prop({type: String, required: true,unique: true})
    nom: string;

    @Prop({type: Types.ObjectId, ref: Ufr.name, required: true,autopopulation: true})
    ufr: string;
}

export const DepartementSchema = SchemaFactory.createForClass(Departement);
