import { Module } from '@nestjs/common';
import { ResidenceService } from './residence.service';
import { ResidenceController } from './residence.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Residence, ResidenceSchema } from './entities/residence.entity';

@Module({
  imports: [MongooseModule.forFeatureAsync([{name: Residence.name, useFactory:() => {
    const schema = ResidenceSchema;
    schema.plugin(require('mongoose-autopopulate'));
    return schema;
}}],'codif')],
  controllers: [ResidenceController],
  providers: [ResidenceService],
  exports: [ResidenceService],
})
export class ResidenceModule {}
