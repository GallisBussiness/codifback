import { PartialType } from '@nestjs/mapped-types';
import { CreateUfrDto } from './create-ufr.dto';

export class UpdateUfrDto extends PartialType(CreateUfrDto) {}
