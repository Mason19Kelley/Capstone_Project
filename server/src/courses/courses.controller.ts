import { Controller, Request, Get, UseGuards, Param, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from 'src/auth/auth.model';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { CoursesService } from './courses.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

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
    async insertCourse(@Param('course') course: string, @Param('jsonInformation') jsonInformation: string, @Param('instructor') instructor: string, @Param('organization') organization: string){
        console.log('inserting course')
        return await this.coursesService.insertCourse(course, jsonInformation, instructor, organization)
    }

    @Get('getAllCourses')
    async getAllCourses() {
        return await this.coursesService.getAllCourses()
    }

    @Get('getOneCourse/:course/:org')
    async getOneCourse(@Param('course') course: string, @Param('org') org: string) {
        return await this.coursesService.getOneCourse(course, org)
    }

    @Post('deleteCourse/:course')
    async deleteCourse(@Param('course') course: string) {
        return await this.coursesService.deleteCourse(course)
    }
}
