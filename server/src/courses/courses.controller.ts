import { Controller, Request, Get, UseGuards, Param, Post, Body } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/auth/auth.model';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { CoursesService } from './courses.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import pako from 'pako'

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

    @Post('insertCourse/:course/:jsonInformation/:instructor/:organization')
    async insertCourse(@Param('course') course: string, @Param('jsonInformation') jsonInformation: string, @Param('instructor') instructor: string, @Param('organization') organization: number){
        console.log('inserting course')
        return await this.coursesService.insertCourse(course, jsonInformation, instructor, organization)
    }

    @Get('getAllCourses/:org_ID')
    async getAllCourses(@Param('org_ID') org_ID: number){
        return await this.coursesService.getAllCourses(org_ID)
    
    }

    @Get('getOneCourse/:course/:org')
    async getOneCourse(@Param('course') course: string, @Param('org') org: number) {
        return await this.coursesService.getOneCourse(course, org)
    }

    @Post('deleteCourse/:course')
    async deleteCourse(@Param('course') course: string) {
        return await this.coursesService.deleteCourse(course)
    }

    @Post('updateCourse/:courseName/:oldCourseName/:instructor/:oldInstructorName')
    async updateCourse(@Param('courseName') courseName: string, @Param('oldCourseName') oldCourseName: string, @Param('instructor') instructor: string, @Param('oldInstructorName') oldInstructorName: string){
        return await this.coursesService.updateCourse(courseName, oldCourseName, instructor, oldInstructorName)
    }

    @Post('updateCourseJSON/:courseName')
    async updateCourseJSON(@Param('courseName') courseName: string,@Body() courseJSON: string){
        console.log(courseJSON)
        console.log("success")
        return await this.coursesService.updateCourseJSON(courseName, courseJSON)
    }
}

