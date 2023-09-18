import { Injectable } from '@nestjs/common';

@Injectable()
export class ApiGatewayService {
  getHealth(): object {
    return { status: 'ok' };
  }
}
