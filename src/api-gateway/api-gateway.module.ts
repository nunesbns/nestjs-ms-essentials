import { Module } from '@nestjs/common';
import { ApiGatewayController } from './api-gateway.controller';
import { ApiGatewayService } from './api-gateway.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import msConfig from '../config/app.config';
import databaseConfig from '../config/database.config';
import kafkaConfig from '../config/kafka.config';
import logConfig from '../config/log.config';
import esConfig from '../config/es.config';
import { UsersModule } from 'src/users/users.module';
import natsConfig from 'src/config/nats.config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [
        msConfig,
        databaseConfig,
        kafkaConfig,
        logConfig,
        esConfig,
        natsConfig,
      ],
    }),
    UsersModule,
  ],
  controllers: [ApiGatewayController],
  providers: [
    ApiGatewayService,
    {
      provide: 'GATEWAY_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.NATS,
          options: {
            servers: configService.get('nats.hosts'),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class ApiGatewayModule {}
