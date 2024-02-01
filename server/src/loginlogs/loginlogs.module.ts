import { Module } from '@nestjs/common';
import { LoginLogsService } from './loginlogs.service';
import { LoginLog } from './loginlogs.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [LoginLogsService],
  imports: [TypeOrmModule.forFeature([LoginLog])],
  exports: [LoginLogsService],
})
export class LoginlogsModule {}
