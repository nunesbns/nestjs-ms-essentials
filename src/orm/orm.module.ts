import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import ormConfig from 'src/config/orm.config';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      useFactory: ormConfig,
    }),
    MikroOrmModule.forFeature({
      entities: [],
    }),
  ],
  exports: [MikroOrmModule],
})
export class OrmModule {}
