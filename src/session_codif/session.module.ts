import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Session, SessionSchema } from './entities/session.entity';
import { PavillonModule } from 'src/pavillon/pavillon.module';
import { InscriptionModule } from 'src/inscription/inscription.module';
import { FormationModule } from 'src/formation/formation.module';
import { SessionEtudiantModule } from 'src/session-etudiant/session-etudiant.module';

@Module({
  imports: [MongooseModule.forFeatureAsync([{name: Session.name, useFactory: () => {
    const schema = SessionSchema;
      schema.plugin(require('mongoose-autopopulate'));
    return schema;
  }}],'codif'),
  PavillonModule,
  InscriptionModule,
  FormationModule,
  SessionEtudiantModule
  ],
  controllers: [SessionController],
  providers: [SessionService],
  exports:[SessionService]
})
export class SessionModule {}
