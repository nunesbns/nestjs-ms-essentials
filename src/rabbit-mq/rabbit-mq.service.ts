import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  ClientProxy,
  ClientProxyFactory,
  RmqOptions,
  Transport,
} from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class RabbitMqService {
  private client: { [key: string]: ClientProxy } = {};
  constructor(private readonly configService: ConfigService) {}

  private getOptions(queue: string): RmqOptions {
    return {
      transport: Transport.RMQ,
      options: {
        queue: queue,
        urls: this.configService.get<string[]>('rmq.hosts'),
        queueOptions: {
          durable: this.configService.get<boolean>('rmq.durable'),
        },
      },
    };
  }

  public getClientForQueue(queue: string): ClientProxy {
    if (!this.client[queue]) {
      this.client[queue] = ClientProxyFactory.create(this.getOptions(queue));
    }
    return this.client[queue];
  }

  public closeClientForQueue(queue: string): void {
    if (this.client[queue]) {
      this.client[queue].close();
      delete this.client[queue];
    }
  }

  public sendToQueue(
    pattern: string,
    queue: string,
    data: any,
  ): Observable<any> {
    const client = this.getClientForQueue(queue);
    return client.send(pattern, data);
  }

  public emitToQueue(pattern: string, queue: string, data: any): void {
    const client = this.getClientForQueue(queue);
    client.emit(pattern, data);
  }
}
