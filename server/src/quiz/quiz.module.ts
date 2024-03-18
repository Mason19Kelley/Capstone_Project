import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Quiz } from './quiz.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz])],
  providers: [QuizService],
  exports: [QuizService],
})
export class QuizModule {}
