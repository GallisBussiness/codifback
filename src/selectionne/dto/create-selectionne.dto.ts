import { IsEnum, IsMongoId, IsObject, IsOptional } from "class-validator";

export enum TYPECODIF {
    SOCIALE = "SOCIALE",
    PEDAGOGIQUE = "PEDAGOGIQUE"
}
export class CreateSelectionneDto {
    @IsMongoId()
    session: string;

    @IsObject()
    inscription: object;

    @IsOptional()
    @IsEnum(TYPECODIF)
    typeCodif: string;

    @IsMongoId()
    formation: string;
}
