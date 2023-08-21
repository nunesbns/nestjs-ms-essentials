import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import SchemaValidation, {
  ValidationConfig,
} from 'src/utils/schemaValidation.util';

interface MsConfigInterface {
  port: number;
  name: string;
  env: string;
}

export default registerAs('ms', (): MsConfigInterface => {
  const configs: ValidationConfig<MsConfigInterface> = {
    port: {
      value: parseInt(process.env.MS_PORT, 10) || 3000,
      schema: Joi.number(),
    },
    name: {
      value: process.env.MS_NAME,
      schema: Joi.string().required(),
    },
    env: {
      value: process.env.ENV,
      schema: Joi.string().valid(
        'development',
        'homologation',
        'staging',
        'production',
      ),
    },
  };

  return SchemaValidation.validate(configs);
});
