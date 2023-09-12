import { IsMongoId, IsString } from "class-validator";

export class CreateFormationDto {
    @IsString()
    nom: string;

    @IsMongoId()
    departement: string;
}
