import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Courses } from './courses.entity';
import { CourseCompletion } from './course-completion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Courses, CourseCompletion])],
  providers: [CoursesService],
  exports: [CoursesService],
  controllers: [CoursesController]
})
export class CoursesModule {}

