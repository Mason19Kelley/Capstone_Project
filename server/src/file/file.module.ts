import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  controllers: [FileController],
  providers: [FileService],
  imports: [StorageModule],
})
export class FileModule {}
