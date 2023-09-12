import { Module } from '@nestjs/common';
import { EtudiantService } from './etudiant.service';
import { EtudiantController } from './etudiant.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Etudiant, EtudiantSchema } from './entities/etudiant.entity';
import { FormationModule } from 'src/formation/formation.module';
import { Formation, FormationSchema } from 'src/formation/entities/formation.entity';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      { name: Etudiant.name,useFactory: () => {
        const schema = EtudiantSchema;
        schema.plugin(require('mongoose-autopopulate'));
        return schema;
      }, },
    ],"etudiant"),
    MongooseModule.forFeature([{name: Formation.name, schema: FormationSchema}],'etudiant'),
    FormationModule
  ],
  controllers: [EtudiantController],
  providers: [EtudiantService],
  exports:[EtudiantService]
})
export class EtudiantModule {}
