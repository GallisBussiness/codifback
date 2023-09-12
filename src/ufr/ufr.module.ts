import { Module } from '@nestjs/common';
import { UfrService } from './ufr.service';
import { UfrController } from './ufr.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Ufr, UfrSchema } from './entities/ufr.entity';

@Module({
  imports: [MongooseModule.forFeature([{name: Ufr.name,schema: UfrSchema}],"etudiant")],
  controllers: [UfrController],
  providers: [UfrService]
})
export class UfrModule {}
