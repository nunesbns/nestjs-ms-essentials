import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import SchemaValidation, {
  ValidationConfig,
} from 'src/utils/schemaValidation.util';

interface NatsConfigInterface {
  hosts: Array<string>;
}

export default registerAs('nats', (): NatsConfigInterface => {
  const configs: ValidationConfig<NatsConfigInterface> = {
    hosts: {
      value: JSON.parse(process.env.NATS_HOSTS),
      schema: Joi.array().required(),
    },
  };

  return SchemaValidation.validate(configs);
});
