import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import SchemaValidation, {
  ValidationConfig,
} from '../utils/schemaValidation.util';

interface DatabaseConfigInterface {
  host: string;
  name: string;
  username: string;
  password: string;
  port: number;
}

export default registerAs('database', (): DatabaseConfigInterface => {
  const configs: ValidationConfig<DatabaseConfigInterface> = {
    host: {
      value: process.env.DB_HOST || 'localhost',
      schema: Joi.string().required(),
    },
    name: {
      value: process.env.DB_DATABASE,
      schema: Joi.string().required(),
    },
    username: {
      value: process.env.DB_USERNAME,
      schema: Joi.string().required(),
    },
    password: {
      value: process.env.DB_PASSWORD,
      schema: Joi.string().required(),
    },
    port: {
      value: process.env.DB_PORT,
      schema: Joi.number().required(),
    },
  };

  return SchemaValidation.validate(configs);
});
