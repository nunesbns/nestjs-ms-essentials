import { Module } from '@nestjs/common';
import { AppController } from './api-gateway.controller';
import { AppService } from './api-gateway.service';
import { ConfigModule } from '@nestjs/config';
import msConfig from '../config/app.config';
import databaseConfig from '../config/database.config';
import kafkaConfig from '../config/kafka.config';
import logConfig from '../config/log.config';
import esConfig from '../config/es.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [msConfig, databaseConfig, kafkaConfig, logConfig, esConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
