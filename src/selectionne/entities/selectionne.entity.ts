import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Session } from "src/session_codif/entities/session.entity";
import { TYPECODIF } from "../dto/create-selectionne.dto";

export type SelectionneDocument = Selectionne & Document;

@Schema({timestamps: true})
export class Selectionne {
    @Prop({type: Types.ObjectId, ref: Session.name, required: true})
    session: Session;

    @Prop({type: Object, required: true})
    inscription: any;

    @Prop({type: String,enum:TYPECODIF, default:TYPECODIF.PEDAGOGIQUE, required: true})
    typeCodif: string;

    @Prop({type: String, required: true})
    formation: string;
}

export const SelectionneSchema = SchemaFactory.createForClass(Selectionne);
