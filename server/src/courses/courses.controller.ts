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
}
