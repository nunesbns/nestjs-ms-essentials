import * as Joi from 'joi';

interface ConfigProps {
  value: unknown;
  schema: Joi.Schema;
}

export type ValidationConfig<T> = Record<keyof T, ConfigProps>;

export default class SchemaValidation {
  static validate<T>(config: ValidationConfig<T>): T {
    const schemaObj = SchemaValidation.extractByPropName(
      config,
      'schema',
    ) as Joi.SchemaMap<T>;
    const schema = Joi.object(schemaObj);
    const values = SchemaValidation.extractByPropName(config, 'value') as T;
    const { error } = schema.validate(values, { abortEarly: false });

    if (error) {
      throw new Error(
        `Validation failed
        ${error.message}`,
      );
    }

    return values;
  }

  static extractByPropName<T>(
    config: ValidationConfig<T>,
    propName: keyof ConfigProps,
  ): T | Joi.SchemaMap<T> {
    const arr: any[] = Object.keys(config).map((key) => {
      return {
        [key]: config[key][propName],
      };
    });

    return Object.assign({}, ...arr);
  }
}
