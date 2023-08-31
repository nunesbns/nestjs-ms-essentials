import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { logger } from './logger/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: logger(),
  });
  const configService = app.get(ConfigService);

  await app.listen(configService.get<number>('ms.port'));
}
bootstrap();
