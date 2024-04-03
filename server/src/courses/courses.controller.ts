import { Controller, Get, Param, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { CoursesService } from './courses.service';
import { CourseCompletionBody } from './course-completion.interface';


@ApiTags('courses')
@Controller('courses')
@ApiBearerAuth()
export class CoursesController {

    constructor(private coursesService: CoursesService) {}

    //@UseGuards(JwtAuthGuard)
    @Get('getCourses/:id')
    async getCoursesById(@Param('id') id: number) {
        return await this.coursesService.findCourseById(id)
    }

    //insert a course with appropriate information: course Name, JSON, instructor Name, and organization ID
    @Post('insertCourse/:course/:jsonInformation/:instructor/:organization')
    async insertCourse(@Param('course') course: string, @Param('jsonInformation') jsonInformation: string, @Param('instructor') instructor: string, @Param('organization') organization: number){
        console.log('inserting course')
        return await this.coursesService.insertCourse(course, jsonInformation, instructor, organization)
    }

    //get all courses based on organization ID
    @Get('getAllCourses/:org_ID')
    async getAllCourses(@Param('org_ID') org_ID: number){
        return await this.coursesService.getAllCourses(org_ID)
    
    }

    //get one course based on course name and organization ID
    @Get('getOneCourse/:course/:org')
    async getOneCourse(@Param('course') course: string, @Param('org') org: number) {
        return await this.coursesService.getOneCourse(course, org)
    }

    //get all users in a course
    @Get('getUsersInCourse/:course')
    async getUsersInCourse(@Param('course') course: string) {
        return await this.coursesService.getUsersInCourse(course)
    }

    //deletes a course
    @Post('deleteCourse/:course')
    async deleteCourse(@Param('course') course: string) {
        return await this.coursesService.deleteCourse(course)
    }

    //updates a courses name and instructor name
    @Post('updateCourse/:courseName/:oldCourseName/:instructor/:oldInstructorName')
    async updateCourse(@Param('courseName') courseName: string, @Param('oldCourseName') oldCourseName: string, @Param('instructor') instructor: string, @Param('oldInstructorName') oldInstructorName: string){
        return await this.coursesService.updateCourse(courseName, oldCourseName, instructor, oldInstructorName)
    }

    //updates a courses JSON based on course name
    @Post('updateCourseJSON/:courseName')
    async updateCourseJSON(@Param('courseName') courseName: string, @Body() courseJSON: JSON){
        console.log(courseJSON)
        const temp = JSON.stringify(courseJSON)
        console.log("success")

        return await this.coursesService.updateCourseJSON(courseName, temp)
    }

    @Get('getCourseCompletion/:userId/:courseId')
    async getCourseCompletion(@Param('userId') userId: number, @Param('courseId') courseId: number) {
        return await this.coursesService.getCourseCompletion(userId, courseId)
    }

    @Post('updateCourseCompletion/:userId/:courseId')
    async updateCourseCompletion(@Param('userId') userId: number, @Param('courseId') courseId: number, @Body() completion: CourseCompletionBody) {
        return await this.coursesService.updateCourseCompletion(userId, courseId, completion.moduleCompleted, completion.contentCompleted)
    }

    
}


