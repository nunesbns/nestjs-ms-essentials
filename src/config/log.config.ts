import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import SchemaValidation, {
  ValidationConfig,
} from 'src/utils/schemaValidation.util';

interface LogConfigInterface {
  level: Array<string>;
}

export default registerAs('log', (): LogConfigInterface => {
  const configs: ValidationConfig<LogConfigInterface> = {
    level: {
      value: process.env.LOG_LEVEL || 'info',
      schema: Joi.string().valid(
        'error',
        'warn',
        'info',
        'http',
        'verbose',
        'debug',
        'silly',
      ),
    },
  };
  return SchemaValidation.validate(configs);
});
