import { HttpException, Injectable } from '@nestjs/common';
import { CreateSocialeDto } from './dto/create-sociale.dto';
import { UpdateSocialeDto } from './dto/update-sociale.dto';
import { AbstractModel } from 'src/utils/abstractmodel';
import { InjectModel } from '@nestjs/mongoose';
import { Sociale, SocialeDocument } from './entities/sociale.entity';
import { Model } from 'mongoose';

@Injectable()
export class SocialeService extends AbstractModel<Sociale,CreateSocialeDto,UpdateSocialeDto>{
  constructor(@InjectModel(Sociale.name) private SocialeModel: Model<SocialeDocument>) {
    super(SocialeModel);
}

async findBySession(session: string): Promise<Sociale[]> {
  try {
    return await this.SocialeModel.find({session})
  } catch (error) {
    throw new HttpException(error.message, 500);
  }
}
}
