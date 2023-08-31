import { format, transports } from 'winston';
import { ElasticsearchTransport } from 'winston-elasticsearch';
import { WinstonModule } from 'nest-winston';

export const logger = () => {
  const consoleTransport = new transports.Console({
    format: format.combine(format.colorize(), format.simple()),
  });

  const esTransport = new ElasticsearchTransport({
    level: process.env.ES_LOG_LEVEL,
    clientOpts: {
      node: process.env.ES_HOST,
      auth: {
        apiKey: process.env.ES_API_KEY,
      },
    },
  });

  return WinstonModule.createLogger({
    level: process.env.LOG_LEVEL,
    format: format.combine(format.json(), format.timestamp()),
    transports: [consoleTransport, esTransport],
  });
};
