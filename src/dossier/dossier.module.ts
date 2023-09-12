import { Module } from '@nestjs/common';
import { DossierService } from './dossier.service';
import { DossierController } from './dossier.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Dossier, DossierSchema } from './entities/dossier.entity';
import { PayementModule } from 'src/payement/payement.module';

@Module({
  imports: [MongooseModule.forFeatureAsync([{name: Dossier.name,useFactory:() => {
    const schema =  DossierSchema;
    schema.plugin(require("mongoose-autopopulate"));
    return schema;
  }}],'codif'),
  PayementModule
],
  controllers: [DossierController],
  providers: [DossierService]
})
export class DossierModule {}
