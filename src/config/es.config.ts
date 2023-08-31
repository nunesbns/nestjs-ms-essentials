import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import SchemaValidation, {
  ValidationConfig,
} from 'src/utils/schemaValidation.util';

interface EsConfigInterface {
  host: string;
  apiKey: string;
  logLevel: string;
}

export default registerAs('es', (): EsConfigInterface => {
  const configs: ValidationConfig<EsConfigInterface> = {
    host: {
      value: process.env.ES_HOST || 'http://localhost:9200',
      schema: Joi.string(),
    },
    apiKey: {
      value: process.env.ES_API_KEY,
      schema: Joi.string().required(),
    },
    logLevel: {
      value: process.env.ES_LOG_LEVEL || 'warn',
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
