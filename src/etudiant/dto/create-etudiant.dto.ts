import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsMongoId,
  IsObject,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateEtudiantDto {
  @IsOptional()
  @IsString()
  nce: string;

  @IsString()
  cni: string;

  
  @IsString()
  prenom: string;

  @IsString()
  nom: string;

  @IsString()
  sexe: string;

  @IsString()
  dateDeNaissance: string;

  @IsString()
  lieuDeNaissance: string;

  @IsString()
  adresse: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsPhoneNumber('SN')
  @IsOptional()
  telephone: string;

  @IsString()
  formation: string;

  @IsOptional()
  @IsBoolean()
  apte: boolean;

  @IsMongoId()
  user: string;
}
