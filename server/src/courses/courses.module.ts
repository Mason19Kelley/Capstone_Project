import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Courses } from './courses.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Courses])],
  providers: [CoursesService],
  exports: [CoursesService],
})
export class CoursesModule {}

