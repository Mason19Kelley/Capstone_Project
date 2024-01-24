import { Module } from '@nestjs/common';
import { LoginlogsService } from './loginlogs.service';
import { LoginLog } from '../loginlogs/loginlogs.entity';

@Module({
  providers: [LoginlogsService]
})
export class LoginlogsModule {}
