import { Options } from '@mikro-orm/mariadb';
import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
const ormConfig = function (): Options {
  return {
    type: configService.get('DB_TYPE'),
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    user: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    dbName: configService.get('DB_DATABASE'),
    forceUtcTimezone: true,
    entities: ['./dist/**/entities/*.entity.js'],
    entitiesTs: ['./src/**/entities/*.entity.ts'],
  };
};

export default ormConfig;
