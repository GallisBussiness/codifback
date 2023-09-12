import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Dossier } from "src/dossier/entities/dossier.entity";
import { Session } from "src/session_codif/entities/session.entity";

export type PayementDocument = Payement & Document

@Schema({timestamps: true})
export class Payement {

    _id: string;

    @Prop({type: Types.ObjectId, ref: Session.name, required: true, autopopulate: true})
    session: string;

    @Prop({type: Types.ObjectId, ref: Dossier.name, required: true, autopopulate: true})
    dossier: string;

    @Prop({type: Boolean, default: false,required: true})
    janvier: boolean;

    @Prop({type: Boolean,default: false,required: true})
    fevrier: boolean;

    @Prop({type: Boolean,default: false,required: true})
    mars: boolean;

    @Prop({type: Boolean,default: false,required: true})
    avril: boolean;

    @Prop({type: Boolean,default: false,required: true})
    mai: boolean;

    @Prop({type: Boolean,default: false,required: true})
    juin: boolean;

    @Prop({type: Boolean,default: false,required: true})
    juillet: boolean;

    @Prop({type: Boolean,default: false,required: true})
      aout: boolean;

    @Prop({type: Boolean,default: false,required: true})
    septembre: boolean;

    @Prop({type: Boolean,default: false,required: true})
    octobre: boolean;

    @Prop({type: Boolean,default: false,required: true})
    novembre: boolean;

    @Prop({type: Boolean,default: false,required: true})
    decembre: boolean;
}

export const PayementSchema = SchemaFactory.createForClass(Payement);