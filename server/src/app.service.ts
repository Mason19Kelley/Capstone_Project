import { Injectable } from '@nestjs/common';

// base app service, currently not used for anything
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
