import { PartialType } from '@nestjs/mapped-types';
import { CreateSocialeDto } from './create-sociale.dto';

export class UpdateSocialeDto extends PartialType(CreateSocialeDto) {}
