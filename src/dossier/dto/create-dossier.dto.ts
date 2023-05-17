import { IsMongoId, IsObject } from "class-validator";

export class CreateDossierDto {
    @IsMongoId()
    session: string;

    @IsMongoId()
    inscription: string;

    @IsObject()
    mobilier_cite: any;

    @IsObject()
    mobilier_resident: any;

    @IsObject()
    paiements: any;
}
