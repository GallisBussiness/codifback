import { Injectable,HttpException } from '@nestjs/common';
import { CreateDossierDto } from './dto/create-dossier.dto';
import { UpdateDossierDto } from './dto/update-dossier.dto';
import { AbstractModel } from 'src/utils/abstractmodel';
import { Dossier, DossierDocument } from './entities/dossier.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class DossierService extends AbstractModel<Dossier,CreateDossierDto,UpdateDossierDto>{
  constructor(@InjectModel(Dossier.name) private dossierModel: Model<DossierDocument>) {
    super(dossierModel);
  }

  async findOneByInscription(ins: string): Promise<Dossier> {
   try {
    return await this.dossierModel.findOne({inscription: ins});
   } catch (error) {
    throw new HttpException(error.message,500);
   }
  }
}
