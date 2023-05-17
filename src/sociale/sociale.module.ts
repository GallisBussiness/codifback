import { Module } from '@nestjs/common';
import { SocialeService } from './sociale.service';
import { SocialeController } from './sociale.controller';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { Sociale, SocialeSchema } from './entities/sociale.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Sociale.name, schema: SocialeSchema}]),
    HttpModule
  ],
  controllers: [SocialeController],
  providers: [SocialeService]
})
export class SocialeModule {}
