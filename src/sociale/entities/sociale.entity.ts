import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { Session } from "src/session/entities/session.entity";

export type SocialeDocument = Sociale & Document;

@Schema({timestamps: true})
export class Sociale {
    @Prop({type: Types.ObjectId, ref: Session.name, required: true})
    session: Session;

    @Prop({type: Object, required: true})
    inscription: any;
}


export const SocialeSchema = SchemaFactory.createForClass(Sociale);