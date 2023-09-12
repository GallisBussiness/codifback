import { IsBoolean, IsMongoId, IsNumber, IsString } from "class-validator";

export class CreateSessionDto {
    @IsString()
    annee: string;

    @IsBoolean()
    etat: boolean;

    @IsNumber()
    pedagogique: number;

    @IsNumber()
    sociale: number;

    @IsNumber()
    amicale: number;

    @IsNumber()
    autre: number;

    @IsNumber()
    licence1: number;

    @IsNumber()
    licence2: number;

    @IsNumber()
    licence3: number;

    @IsNumber()
    master1: number;

    @IsNumber()
    master2: number;

    @IsNumber()
    depot: number;

    @IsNumber()
    interne: number;

    @IsNumber()
    etranger: number;

    @IsMongoId()
    pedagogique_session: string;
}
