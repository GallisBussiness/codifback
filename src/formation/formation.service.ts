import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AbstractModel } from 'src/utils/abstractmodel';
import { CreateFormationDto } from './dto/create-formation.dto';
import { UpdateFormationDto } from './dto/update-formation.dto';
import { Formation, FormationDocument } from './entities/formation.entity';

@Injectable()
export class FormationService extends AbstractModel<Formation,CreateFormationDto,UpdateFormationDto> {
 constructor(@InjectModel(Formation.name,'etudiant') private formationModel: Model<FormationDocument>) {
  super(formationModel);
 }

 async findByNiveau(): Promise<any> {
   try {
    return await this.formationModel.aggregate().group({
        _id: {_id: {$substr: [ "$nom", {$subtract: [{ $strLenBytes: "$nom" },8]},-1  ]}, departement: "$departement"},
        total: {
          $sum: 1
        }
      }).addFields({
        "departement": {"$toObjectId": "$_id.departement"}
      }).lookup({
        from: "departements",
        localField: "departement",
        foreignField: "_id",
        as: "departement"
      }).unwind({
        path: "$departement",
        preserveNullAndEmptyArrays: true
      })
   } catch (error) {
    throw new HttpException(error.message,500);
   }
 }
}
