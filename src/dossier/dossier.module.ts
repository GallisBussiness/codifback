import { Module } from '@nestjs/common';
import { DossierService } from './dossier.service';
import { DossierController } from './dossier.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Dossier, DossierSchema } from './entities/dossier.entity';

@Module({
  imports: [MongooseModule.forFeature([{name: Dossier.name,schema: DossierSchema}])],
  controllers: [DossierController],
  providers: [DossierService]
})
export class DossierModule {}
