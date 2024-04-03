import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './quiz.entity';
import { CoursesModule } from 'src/courses/courses.module'; // Import CoursesModule

@Module({
  imports: [TypeOrmModule.forFeature([Quiz]), CoursesModule], // Import CoursesModule
  controllers: [QuizController],
  providers: [QuizService],
  exports: [QuizService],
})
export class QuizModule {}