import { HttpException, Injectable } from '@nestjs/common';
import { CreatePayementDto } from './dto/create-payement.dto';
import { UpdatePayementDto } from './dto/update-payement.dto';
import { AbstractModel } from 'src/utils/abstractmodel';
import { Payement, PayementDocument } from './entities/payement.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class PayementService extends AbstractModel<Payement,CreatePayementDto,UpdatePayementDto>{
  constructor(@InjectModel(Payement.name,'codif') private readonly payementModel: Model<PayementDocument>){
    super(payementModel);
  }

  async findByDossier(dossier: string): Promise<Payement> {
    try {
      return await this.payementModel.findOne({dossier: new Types.ObjectId(dossier)});
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
