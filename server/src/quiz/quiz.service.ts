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

      async findQuizById(qid: string){
        const quiz = await this.quizRepository.findOne({ where: { id: qid } });
        return quiz
      }

      async saveQuiz(quiz: any){
        const quizEntity = this.quizRepository.create(quiz)
        return this.quizRepository.insert(quizEntity)
      }

      async updateQuiz(quiz: any, quizId: string){
        const quizjson = JSON.stringify(quiz)

        const updateFields = {
          Quiz_Name: quiz.QuizName,
          Quiz_JSON: quizjson
        }
        return this.quizRepository.update(quizId, updateFields)
      }


async seedOrganizations() {

  const quizJSON = {
    QuizName : "Test Quiz",
    QuizID : "95352491-342e-480b-b05e-c4a4e94d96b7",
    Questions : [
        {
      question: "What is the airspeed velocity of an Unladen Swallow?",
      options: [
        { label: "What do you mean?", value: "a", isCorrect: false },
        { label: "An African or European swallow?", value: "b", isCorrect: true },
        { label: "Huh? I-- I don't know that!", value: "c", isCorrect: false }
      ],
      key: "q1"
    },
    {
      question: "What time is it?",
      options: [
        { label: "Adventure Time!", value: "a", isCorrect: false },
        { label: "Half past ten.", value: "b", isCorrect: false },
        { label: "Time for you to get a watch!", value: "c", isCorrect: true }
      ],
      key: "q2"
    },
    {
      question: "My life be like...",
      options: [
        { label: "oooooooo", value: "a", isCorrect: false },
        { label: "aaaaaaaa", value: "b", isCorrect: false },
        { label: "ooooooooooooooooooo", value: "c", isCorrect: true }
      ],
      key: "q3"
    },
    ]
}

 

    let quiz = await this.quizRepository.count();

    if(quiz > 0) return

    

    const quizToSeed = [
      { id: '95352491-342e-480b-b05e-c4a4e94d96b7', Quiz_Name: 'Test Quiz', Quiz_JSON: JSON.stringify(quizJSON) },
    ];

    const voteEntities = this.quizRepository.create(quizToSeed)
    await this.quizRepository.insert(voteEntities)
    
  }
}
