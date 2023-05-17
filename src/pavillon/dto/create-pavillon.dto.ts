import { IsMongoId, IsNumber, IsString } from "class-validator";

export class CreatePavillonDto {
    @IsString()
    nom: string;

    @IsString()
    type: string;

    @IsNumber()
    nb_lit: number;

    @IsMongoId()
    residence: string;
}
