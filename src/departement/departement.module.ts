import { Module } from '@nestjs/common';
import { DepartementService } from './departement.service';
import { DepartementController } from './departement.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Departement, DepartementSchema } from './entities/departement.entity';

@Module({
  imports: [MongooseModule.forFeatureAsync([{name: Departement.name, useFactory:() => {
    const schema = DepartementSchema;
    schema.plugin(require('mongoose-autopopulate'));
    return schema;
  }}],"etudiant"),],
  controllers: [DepartementController],
  providers: [DepartementService]
})
export class DepartementModule {}
