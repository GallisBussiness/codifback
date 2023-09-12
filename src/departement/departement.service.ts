import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDepartementDto } from './dto/create-departement.dto';
import { UpdateDepartementDto } from './dto/update-departement.dto';
import { Departement, DepartementDocument } from './entities/departement.entity';
import { AbstractModel } from 'src/utils/abstractmodel';

@Injectable()
export class DepartementService extends AbstractModel<Departement,CreateDepartementDto,UpdateDepartementDto> {
  constructor(@InjectModel(Departement.name,"etudiant") private departementModel: Model<DepartementDocument>) {
    super(departementModel);
  }
  
}
