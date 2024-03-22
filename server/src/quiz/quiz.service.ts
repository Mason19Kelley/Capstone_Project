import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Quiz } from './quiz.entity';


@Injectable()
export class QuizService {
    constructor(
        @InjectRepository(Quiz)
        private quizRepository: Repository<Quiz>,
      ) {}

      



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
