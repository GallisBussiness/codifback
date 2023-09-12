import { HttpException, Injectable } from '@nestjs/common';
import { AbstractModel } from 'src/utils/abstractmodel';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Session, SessionEtudiantDocument } from './entities/session-etudiant.entity';
import { CreateSessionEtudiantDto } from './dto/create-session-etudiant.dto';
import { UpdateSessionEtudiantDto } from './dto/update-session-etudiant.dto';

@Injectable()
export class SessionEtudiantService extends AbstractModel<Session, CreateSessionEtudiantDto,UpdateSessionEtudiantDto> {
  constructor(@InjectModel(Session.name,'etudiant') private sessionEtudiantModel: Model<SessionEtudiantDocument>) {
    super(sessionEtudiantModel);
  }

  async findAllActivate(): Promise<Session[]> {
      try {
        return await this.sessionEtudiantModel.find({etat: true});
      }
      catch (err) {
        throw new HttpException(err.message,500);
      }
  }
}