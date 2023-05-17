import { Injectable,HttpException } from '@nestjs/common';
import { CreatePavillonDto } from './dto/create-pavillon.dto';
import { UpdatePavillonDto } from './dto/update-pavillon.dto';
import { AbstractModel } from 'src/utils/abstractmodel';
import { Pavillon, PavillonDocument } from './entities/pavillon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ResidenceService } from 'src/residence/residence.service';

@Injectable()
export class PavillonService extends AbstractModel<Pavillon,CreatePavillonDto,UpdatePavillonDto> {
  constructor(@InjectModel(Pavillon.name) private pavillonModel: Model<PavillonDocument>, private residenceService: ResidenceService) {
    super(pavillonModel);
  }


  async findByResidence(id: string): Promise<Pavillon[]> {
    try {
      return  await this.pavillonModel.find({residence: id});
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async getNbChambreBySession(id: string): Promise<any> {
    try {
     
      const nb = await this.pavillonModel.aggregate([{$addFields: {"residence": {"$toObjectId": "$residence"}}},{$lookup: {
        from: "residences",
        localField: "residence",
        foreignField: "_id",
        as: "residence"
      }}, {$unwind: {
        path: "$residence",
        preserveNullAndEmptyArrays: true
      }}]);
      return nb.filter(v => v.residence.session === id);
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  } 
}
