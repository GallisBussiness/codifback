import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";

export type SessionDocument  = Session & Document;

@Schema({timestamps: true})
export class Session {

    _id: string;

    @Prop({type: String, required: true})
    annee: string;

    @Prop({type: Boolean, required: true, default: false})
    etat: boolean;

    @Prop({type: Number, required: true, default:0})
    pedagogique: number;

    @Prop({type: Number, required: true, default:0})
    sociale: number;

    @Prop({type: Number, required: true, default:0})
    amicale: number;

    @Prop({type: Number, required: true, default:0})
    autre: number;

    @Prop({type: Number, required: true, default:0})
    licence1: number;

    @Prop({type: Number, required: true, default:0})
    licence2: number;

    @Prop({type: Number, required: true, default:0})
    licence3: number;

    @Prop({type: Number, required: true, default:0})
    master1: number;

    @Prop({type: Number, required: true, default:0})
    master2: number;

    @Prop({type: Number, required: true, default:0})
    depot: number;

    @Prop({type: Number, required: true, default:0})
    interne: number;

    @Prop({type: Number, required: true, default:0})
    etranger: number;

    @Prop({type:Types.ObjectId, ref: Session.name,required:true})
    pedagogique_session: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);