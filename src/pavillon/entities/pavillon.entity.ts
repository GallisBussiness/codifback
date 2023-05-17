import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Residence } from "src/residence/entities/residence.entity";

export type PavillonDocument = Pavillon & Document;

@Schema({timestamps: true})
export class Pavillon {
    @Prop({type: String, required: true})
    nom: string;

    @Prop({type: String, required: true})
    type: string;

    @Prop({type: Number, required: true})
    nb_lit: number;

    @Prop({type: Types.ObjectId, ref:Residence.name, required: true})
    residence: string;
}

export const PavillonSchema = SchemaFactory.createForClass(Pavillon);