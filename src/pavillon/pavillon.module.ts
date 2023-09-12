import { Module } from '@nestjs/common';
import { PavillonService } from './pavillon.service';
import { PavillonController } from './pavillon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pavillon, PavillonSchema } from './entities/pavillon.entity';
import { ResidenceModule } from 'src/residence/residence.module';

@Module({
  imports: [MongooseModule.forFeature([{name: Pavillon.name, schema: PavillonSchema}],'codif'), ResidenceModule],
  controllers: [PavillonController],
  providers: [PavillonService],
  exports: [PavillonService],
})
export class PavillonModule {}
