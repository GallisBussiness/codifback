import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthMiddleware } from './auth/auth.middleware';
import { ResidenceModule } from './residence/residence.module';
import { PavillonModule } from './pavillon/pavillon.module';
import { SelectionneModule } from './selectionne/selectionne.module';
import { DossierModule } from './dossier/dossier.module';
import { SessionModule } from './session_codif/session.module';
import { SessionEtudiantModule } from './session-etudiant/session-etudiant.module';
import { PayementModule } from './payement/payement.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // no need to import into other modules
    }),
    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        uri: config.get('MONGODB_URL'),
        autoCreate: true,
      }),
      connectionName: 'codif',
      inject: [ConfigService],
      
    }),
    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        uri: config.get('MONGODB_URL_ETUDIANT'),
        autoCreate: true,
      }),
      connectionName:'etudiant',
      inject: [ConfigService],
    }),
    JwtModule.registerAsync({
      useFactory: async (config: ConfigService) => {
        return {
          secret: config.get('JWT_SECRET'),
          signOptions: { expiresIn: '24h' },
        };
      },
      inject: [ConfigService],
    }),
    UserModule,
    SessionModule,
    ResidenceModule,
    PavillonModule,
    SelectionneModule,
    DossierModule,
    SessionEtudiantModule,
    PayementModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude({ path: 'user/login', method: RequestMethod.POST })
      .forRoutes('*');
  }
}
