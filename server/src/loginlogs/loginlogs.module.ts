import { Module } from '@nestjs/common';
import { LoginLogsService } from './loginlogs.service';
import { LoginLog } from '../loginlogs/loginlogs.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([LoginLog])],
  exports: [LoginLogsService],
  providers: [LoginLogsService]
})
export class LoginlogsModule {}
