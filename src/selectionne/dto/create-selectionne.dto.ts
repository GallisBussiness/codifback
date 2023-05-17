import { IsMongoId, IsObject } from "class-validator";

export class CreateSelectionneDto {
    @IsMongoId()
    session: string;

    @IsObject()
    inscription: object;

    @IsMongoId()
    formation: string;
}
