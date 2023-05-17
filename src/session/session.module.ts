import { Module } from '@nestjs/common';
import { SessionService } from './session.service';
import { SessionController } from './session.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Session, SessionSchema } from './entities/session.entity';
import { PavillonModule } from 'src/pavillon/pavillon.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [MongooseModule.forFeature([{name: Session.name,schema: SessionSchema}]),
  PavillonModule,
  HttpModule,
  ],
  controllers: [SessionController],
  providers: [SessionService]
})
export class SessionModule {}
