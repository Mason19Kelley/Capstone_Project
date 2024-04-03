import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './quiz.entity';
import { v4 as uuidv4 } from 'uuid';


@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz)
        private quizRepository: Repository<Quiz>,
      ) {}

      findQuizById(qid: string){
        return this.quizRepository.findOne({ where: { id: qid } });
      }

      async saveQuiz(quiz: any){
        const quizEntity = this.quizRepository.create(quiz)
        return this.quizRepository.insert(quizEntity)
      }


async seedOrganizations() {

    const quizJson = {
        QuizName: "Test Quiz",
                Questions: [{
                    QuestionType: "Multiple Choice",
                    Question: "What is the capital of France?",
                    Answers: {
                        Correct: [
                            "Paris"
                        ],
                        Incorrect: [
                        "London",
                        "New York",
                        "Berlin"
                        ]
                    },
                }]

    }

    console.log(quizJson)

    let quiz = await this.quizRepository.count();

    if(quiz > 0) return

    

    const quizToSeed = [
      { id: '95352491-342e-480b-b05e-c4a4e94d96b7', Quiz_Name: 'Test Quiz', Quiz_JSON: JSON.stringify(quizJson) },
    ];

    const voteEntities = this.quizRepository.create(quizToSeed)
    await this.quizRepository.insert(voteEntities)
    
  }
}
