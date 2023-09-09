import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import SchemaValidation, {
  ValidationConfig,
} from 'src/utils/schemaValidation.util';

interface RabbitMqConfigInterface {
  hosts: Array<string>;
  durable: boolean;
}

export default registerAs('rmq', (): RabbitMqConfigInterface => {
  const configs: ValidationConfig<RabbitMqConfigInterface> = {
    hosts: {
      value: JSON.parse(process.env.RABBITMQ_HOSTS),
      schema: Joi.array().required(),
    },
    durable: {
      value: process.env.RABBITMQ_DURABLE || false,
      schema: Joi.boolean(),
    },
  };

  return SchemaValidation.validate(configs);
});
