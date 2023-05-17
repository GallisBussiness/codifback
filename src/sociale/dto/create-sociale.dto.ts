import { IsMongoId, IsObject } from "class-validator";

export class CreateSocialeDto {
    @IsMongoId()
    session: string;

    @IsObject()
    inscription: object;

}
