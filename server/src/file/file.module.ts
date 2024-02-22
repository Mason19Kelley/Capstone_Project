import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { StorageModule } from 'src/storage/storage.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [FileController],
  providers: [FileService],
  imports: [StorageModule, AuthModule],
})
export class FileModule {}
