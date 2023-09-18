import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway/api-gateway.module';
import { ConfigService } from '@nestjs/config';
import { logger } from './logger/logger';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(ApiGatewayModule, {
    logger: logger(),
  });
  const configService = app.get(ConfigService);

  app.connectMicroservice({
    transport: Transport.NATS,
    options: {
      servers: configService.get<string>('nats.hosts'),
    },
  });
  await app.startAllMicroservices();
  await app.listen(configService.get<number>('ms.port'));
}
bootstrap();
