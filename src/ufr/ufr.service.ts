import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ufr, UfrDocument } from './entities/ufr.entity';

@Injectable()
export class UfrService {
  constructor(@InjectModel(Ufr.name,"etudiant") private ufrModel: Model<UfrDocument>) {}
}
