import { IsMongoId, IsString } from "class-validator";

export class CreateResidenceDto {
    @IsString()
    nom: string;

    @IsMongoId()
    session: string;
}
