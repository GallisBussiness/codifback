import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Session } from "src/session/entities/session.entity";

export type ResidenceDocument = Residence & Document;

@Schema({timestamps: true})
export class Residence {
    @Prop({type: String, required: true, unique: true})
    nom: string;

    @Prop({type: Types.ObjectId,ref: Session.name, required: true,autopopulate: true})
    session: string;
}

export const ResidenceSchema = SchemaFactory.createForClass(Residence);
