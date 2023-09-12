import { Module } from '@nestjs/common';
import { PayementService } from './payement.service';
import { PayementController } from './payement.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Payement, PayementSchema } from './entities/payement.entity';

@Module({
  imports:[MongooseModule.forFeatureAsync([{name:Payement.name, useFactory:()=> {
    const schema = PayementSchema;
    schema.plugin(require("mongoose-autopopulate"));
    return schema;
  }}],'codif')],
  controllers: [PayementController],
  providers: [PayementService],
  exports:[PayementService]
})
export class PayementModule {}
