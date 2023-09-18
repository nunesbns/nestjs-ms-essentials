// Generated by CodiumAI

import { ClientProxy, Transport } from '@nestjs/microservices';
import { RabbitMqService } from './rabbit-mq.service';
import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';

describe('RabbitMqService', () => {
  let configService: ConfigService;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RabbitMqService, ConfigService],
    }).compile();

    configService = module.get<ConfigService>(ConfigService);
  });

  it('should return existing ClientProxy instance when queue already exists', () => {
    const rabbitMqService = new RabbitMqService(configService);
    const queue = 'testQueue';
    const clientProxy = {} as ClientProxy;
    rabbitMqService['client'][queue] = clientProxy;

    const result = rabbitMqService.getClientForQueue(queue);

    expect(result).toBe(clientProxy);
  });

  it('should return the correct RmqOptions for a given queue', () => {
    const rabbitMqService = new RabbitMqService(configService);
    const queue = 'testQueue';
    const expectedOptions = {
      transport: Transport.RMQ,
      options: {
        queue: queue,
        urls: configService.get<string[]>('rmq.hosts'),
        queueOptions: {
          durable: configService.get<boolean>('rmq.durable'),
        },
      },
    };

    const result = rabbitMqService['getOptions'](queue);

    expect(result).toEqual(expectedOptions);
  });

  it('should return a client proxy when getClientForQueue is called', () => {
    const rabbitMqService = new RabbitMqService(new ConfigService());
    const queue = 'testQueue';

    const result = rabbitMqService.getClientForQueue(queue);

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(ClientProxy);
  });

  it('should send data to the specified queue when sendToQueue is called', () => {
    const rabbitMqService = new RabbitMqService(new ConfigService());
    const queue = 'testQueue';
    const pattern = 'testPattern';
    const data = { message: 'Test message' };

    const result = rabbitMqService.sendToQueue(pattern, queue, data);

    expect(result).toBeInstanceOf(Promise);
  });

  it('should emit data to the specified queue when emitToQueue is called', () => {
    const rabbitMqService = new RabbitMqService(new ConfigService());
    const queue = 'testQueue';
    const pattern = 'testPattern';
    const data = { message: 'Test message' };

    rabbitMqService.emitToQueue(pattern, queue, data);
  });

  it('should return an existing client proxy instance for a queue', () => {
    const rabbitMqService = new RabbitMqService(new ConfigService());
    const queue = 'testQueue';

    const result1 = rabbitMqService.getClientForQueue(queue);
    const result2 = rabbitMqService.getClientForQueue(queue);

    expect(result1).toBeDefined();
    expect(result1).toBeInstanceOf(ClientProxy);
    expect(result2).toBeDefined();
    expect(result2).toBeInstanceOf(ClientProxy);
    expect(result1).toBe(result2);
  });

  it('should close client proxy instance for a queue when closeClientForQueue is called', () => {
    const rabbitMqService = new RabbitMqService(new ConfigService());
    const queue = 'testQueue';

    rabbitMqService.getClientForQueue(queue);
    rabbitMqService.closeClientForQueue(queue);

    expect(rabbitMqService['client'][queue]).toBeUndefined();
  });

  it('should create a new client proxy instance for a given queue', () => {
    const rabbitMqService = new RabbitMqService(new ConfigService());
    const queue = 'testQueue';

    const result = rabbitMqService.getClientForQueue(queue);

    expect(result).toBeDefined();
    expect(result).toBeInstanceOf(ClientProxy);
  });

  it('should not throw an error when client proxy does not exist', () => {
    const rabbitMqService = new RabbitMqService(new ConfigService());
    const queue = 'testQueue';

    expect(() => rabbitMqService.closeClientForQueue(queue)).not.toThrow();
  });

  it('should not throw an error when client proxy is already closed', () => {
    const rabbitMqService = new RabbitMqService(new ConfigService());
    const queue = 'testQueue';

    rabbitMqService.closeClientForQueue(queue);
    expect(() => rabbitMqService.closeClientForQueue(queue)).not.toThrow();
  });
});
