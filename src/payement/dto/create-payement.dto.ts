import { IsBoolean, IsMongoId, IsOptional } from "class-validator";

export class CreatePayementDto {
    @IsMongoId()
    session: string;

    @IsMongoId()
    dossier: string;

    @IsOptional()
    @IsBoolean()
    janvier?: boolean;

    @IsOptional()
    @IsBoolean()
    fevrier?: boolean;

    @IsOptional()
    @IsBoolean()
    mars?: boolean;

    @IsOptional()
    @IsBoolean()
    avril?: boolean;

    @IsOptional()
    @IsBoolean()
    mai?: boolean;

    @IsOptional()
    @IsBoolean()
    juin?: boolean;

    @IsOptional()
    @IsBoolean()
    juillet?: boolean;

    @IsOptional()
    @IsBoolean()
    aout?: boolean;

    @IsOptional()
    @IsBoolean()
    septembre?: boolean;


    @IsOptional()
    @IsBoolean()
    octobre?: boolean;

    @IsOptional()
    @IsBoolean()
    novembre?: boolean;

    @IsOptional()
    @IsBoolean()
    decembre?: boolean;
}
