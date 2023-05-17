import { Injectable,HttpException } from '@nestjs/common';
import { CreateResidenceDto } from './dto/create-residence.dto';
import { UpdateResidenceDto } from './dto/update-residence.dto';
import { AbstractModel } from 'src/utils/abstractmodel';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Residence, ResidenceDocument } from './entities/residence.entity';

@Injectable()
export class ResidenceService extends AbstractModel<Residence,CreateResidenceDto,UpdateResidenceDto>{
  constructor(@InjectModel(Residence.name) private residenceModel: Model<ResidenceDocument>) {
    super(residenceModel);
  }

  async findBySession(id: string): Promise<Residence[]> {
    try {
      return this.residenceModel.find({session: id})
    } catch (error) {
      throw new HttpException(error.message,500);
    }
  }
}
