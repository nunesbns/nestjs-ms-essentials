import { Controller, Get, Inject } from '@nestjs/common';
import { ApiGatewayService } from './api-gateway.service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class ApiGatewayController {
  constructor(
    private readonly agService: ApiGatewayService,
    @Inject('GATEWAY_SERVICE') private client: ClientProxy,
  ) {}

  @Get()
  getHealth(): object {
    return this.agService.getHealth();
  }

  @Get('/users')
  async getUsers() {
    return await firstValueFrom(this.client.send<string>('findAllUsers', ''));
  }
}
