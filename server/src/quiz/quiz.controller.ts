import { Body, Controller, Get, NotFoundException, Param, Post, Put, Res, ServiceUnavailableException, UploadedFile, UseGuards, UseInterceptors, } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { v4 as uuidv4 } from 'uuid';
import { CoursesService } from '../courses/courses.service';
import { useState } from 'react';

interface content  
    {
        contentType : string | null,
        fileType : string | null,
        fileName : string | null,
        quizID : string | null,
        Description : string | null
    }

@Controller('quiz')
export class QuizController {
    constructor(private quizService: QuizService,
                private courseService: CoursesService) {}

    // get quiz by id
    @UseGuards(JwtAuthGuard)
    @Get("getQuizById/:qid")
    async getQuizById(@Param("qid") qid: string) {
        return await this.quizService.findQuizById(qid)
    }

    @UseGuards(JwtAuthGuard)
    @Post("saveQuiz/:courseName/:moduleID/:orgID/:description")
    async saveQuiz(
        @Body() quiz: any,
        @Param('courseName') courseName: string,
        @Param('moduleID') moduleID: string,
        @Param('orgID') orgID: number,
        @Param('description') description: string
    ) {
        const newID = uuidv4();

        quiz.QuizID = newID;

        quiz.Description = description;

        const NewQuiz = {
            Quiz_Name: quiz.QuizName,
            id: newID,
            Quiz_JSON: JSON.stringify(quiz)
        };

        // Update the course with the new quiz information
        const course = await this.courseService.getOneCourse(courseName, orgID);
        if (!course) {
            throw new NotFoundException('Course not found');
        }

        const json = JSON.parse(course.jsonInformation);
        const newContent = { contentType: "Quiz", fileType: null, fileName: quiz.QuizName, quizID: newID, Description: description };
        json.modules.forEach((module: any) => {
            if (module.moduleID === moduleID) {
                module.content.push(newContent);
            }
        });

        await this.courseService.updateCourseJSON(courseName, JSON.stringify(json));

        // Save the quiz
        await this.quizService.saveQuiz(NewQuiz);

        return { message: 'Quiz saved successfully' };
    }

    @UseGuards(JwtAuthGuard)
    @Put("updateQuiz/:quizID")
    async updateQuiz(
        @Body() quiz: any,
        @Param('quizID') quizID: string,
    ) {
        await this.quizService.updateQuiz(quiz, quizID);
        const info = JSON.parse(quiz.Quiz_JSON);
        
    }
}
