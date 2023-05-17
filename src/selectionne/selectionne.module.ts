import { Module } from '@nestjs/common';
import { SelectionneService } from './selectionne.service';
import { SelectionneController } from './selectionne.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Selectionne, SelectionneSchema } from './entities/selectionne.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [MongooseModule.forFeature([{name: Selectionne.name, schema: SelectionneSchema}]),HttpModule],
  controllers: [SelectionneController],
  providers: [SelectionneService]
})
export class SelectionneModule {}
