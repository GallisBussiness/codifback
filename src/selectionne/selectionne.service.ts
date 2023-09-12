import { Injectable,HttpException } from '@nestjs/common';
import { CreateSelectionneDto, TYPECODIF } from './dto/create-selectionne.dto';
import { UpdateSelectionneDto } from './dto/update-selectionne.dto';
import { AbstractModel } from 'src/utils/abstractmodel';
import { InjectModel } from '@nestjs/mongoose';
import { Selectionne, SelectionneDocument } from './entities/selectionne.entity';
import { Model } from 'mongoose';

@Injectable()
export class SelectionneService extends AbstractModel<Selectionne,CreateSelectionneDto,UpdateSelectionneDto> {
  constructor(@InjectModel(Selectionne.name,'codif') private selectionneModel: Model<SelectionneDocument>) {
      super(selectionneModel);
  }

  async findByTypeAndFormation(session: string, formation: string): Promise<Selection[]> {
    try {
      return await this.selectionneModel.find({session,formation})
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
  async findBySociale(session: string): Promise<Selection[]> {
    try {
      return await this.selectionneModel.find({session,typeCodif: TYPECODIF.SOCIALE})
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findBySession(session: string): Promise<Selection[]> {
    try {
      return await this.selectionneModel.find({session})
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }

  async findByDepartement(departement: string): Promise<Selection[]> {
    try {
      return await this.selectionneModel.find({'inscription.formation.departement': departement});
    } catch (error) {
      throw new HttpException(error.message, 500);
    }
  }
}
 
