import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'USERS_SERVICE',
        useFactory: (configService: ConfigService) => {
          return {
            transport: Transport.RMQ,
            options: {
              urls: configService.get<string[]>('rmq.hosts'),
              queue: 'users_queue',
              queueOptions: {
                durable: configService.get<boolean>('rmq.durable'),
              },
            },
          };
        },
        inject: [ConfigService],
      },
    ]),
  ],
})
export class UsersModule {}
