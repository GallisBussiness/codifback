import { IsEnum, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { USER_ROLE } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  prenom: string;

  @IsString()
  nom: string;

  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsOptional()
  @IsEnum(USER_ROLE, { each: true })
  role: USER_ROLE;
}
