import { HttpException, Injectable } from '@nestjs/common';
import { CreateInscriptionDto } from './dto/create-inscription.dto';
import { UpdateInscriptionDto } from './dto/update-inscription.dto';
import { AbstractModel } from 'src/utils/abstractmodel';
import { Inscription, InscriptionDocument } from './entities/inscription.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class InscriptionService extends AbstractModel<Inscription,CreateInscriptionDto,UpdateInscriptionDto>{
  constructor(@InjectModel(Inscription.name,'etudiant') private inscriptionModel: Model<InscriptionDocument>) {
    super(inscriptionModel);
  }

  async findBySession(id: string): Promise<Inscription[]>{
    try {
      return await this.inscriptionModel.find({session: id});
    } catch (error) {
      throw new HttpException(error.message,500);
    }
  }

  async findBySessionAndFormation(session: string,formation:string): Promise<Inscription[]>{
    try {
      return await this.inscriptionModel.find({session,formation});
    } catch (error) {
      throw new HttpException(error.message,500);
    }
  }

  async findByEtudiant(id: string): Promise<Inscription[]>{
    try {
      return await this.inscriptionModel.find({etudiant: id});
    } catch (error) {
      throw new HttpException(error.message,500);
    }
  }

  async findTotalByDepartment(id: string): Promise<any>{
    try {
      return await this.inscriptionModel.aggregate([{$match:{
        "session": id,
        "active": true
      }},{$addFields: {
        "etudiant": {"$toObjectId": "$etudiant"},
        "session": {"$toObjectId": "$session"},
        "formation": {"$toObjectId": "$formation"},
      }}]).lookup({
        from: "formations",
        localField: "formation",
        foreignField: "_id",
        as: "formation"
      }).unwind({
        path: "$formation",
        preserveNullAndEmptyArrays: true
      }).group({
        _id: "$formation.departement",
        total: {
          $sum: 1
        },
      }).addFields({
        "_id": {"$toObjectId": "$_id"}
      }).lookup({
        from: "departements",
        localField: "_id",
        foreignField: "_id",
        as: "departement"
        }).unwind({
          path: "$departement",
          preserveNullAndEmptyArrays: true
        });
    } catch (error) {
      throw new HttpException(error.message,500);
    }
  }

  async findTotalByFormation(id: string): Promise<any>{
    try {
      return await this.inscriptionModel.aggregate([{$match:{
        "session":id,
        "active": true
      }}]).group({
        _id: "$formation",
         total: {
          $sum: 1
        }
      }).addFields({
        "_id": {"$toObjectId": "$_id"}
      }).lookup({
        from: "formations",
        localField: "_id",
        foreignField: "_id",
        as: "formation"
      }).unwind({
        path: "$formation",
        preserveNullAndEmptyArrays: true
      });
    } catch (error) {
      throw new HttpException(error.message,500);
    }
  }

}
