import { IsMongoId, IsObject } from "class-validator";

export class CreateDossierDto {

    @IsMongoId()
    session: string;

    @IsMongoId()
    selectionne: string;

    @IsObject()
    mobilier_cite: any;

    @IsObject()
    mobilier_resident: any;
}
