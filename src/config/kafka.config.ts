import { registerAs } from '@nestjs/config';
import * as Joi from 'joi';
import SchemaValidation, {
  ValidationConfig,
} from 'src/utils/schemaValidation.util';

interface kafkaConfigInterface {
  brokers: Array<string>;
}

export default registerAs('kafka', (): kafkaConfigInterface => {
  const configs: ValidationConfig<kafkaConfigInterface> = {
    brokers: {
      value: JSON.parse(process.env.KAFKA_BROKERS),
      schema: Joi.array().required(),
    },
  };

  return SchemaValidation.validate(configs);
});
