import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// default app controller
// currently unused
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

}
