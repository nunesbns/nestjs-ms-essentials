import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import SchemaValidation, {
  ValidationConfig,
} from 'src/utils/schemaValidation.util';

interface LogConfigInterface {
  levels: Array<string>;
}

export default registerAs('log', (): LogConfigInterface => {
  const configs: ValidationConfig<LogConfigInterface> = {
    levels: {
      value: JSON.parse(process.env.LOG_LEVELS),
      schema: Joi.string().valid('log', 'error', 'warn', 'debug', 'verbose'),
    },
  };

  return SchemaValidation.validate(configs);
});
