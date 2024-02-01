import { Controller, Get, UseGuards, Param, Delete, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UpdateUser } from './UpdateUser.model';
import { Courses } from 'src/courses/courses.entity';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
export class UsersController {

    constructor(private usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get('getUser/:id')
    async getUser(@Param('id') id: number) {
        return await this.usersService.findUserById(id)
    }

    @UseGuards(JwtAuthGuard)
    @Get('getUsersByOrg/:OrgId')
    async getUsersByOrg(@Param('OrgId') orgId: number) {
        return await this.usersService.getUsersByOrg(orgId)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('deleteUser/:id')
    async deleteUser(@Param('id') id: number) {
        return await this.usersService.deleteUser(id)
    }

    @UseGuards(JwtAuthGuard)
    @Post('updateUser')
    async updateUser(@Body() updatedUser: UpdateUser) {
        return await this.usersService.updateUser(updatedUser)
    }

    
    @Post('insertUser/:cid/:uid')
    async insertUser(@Param( 'cid') cid: number, @Param('uid') uid: number) {
        return this.usersService.insertUserInCourse(cid, uid)
    }

    @Delete('deleteUserInCourse/:cid/:uid')
    async deleteUserInCourse(@Param('cid') cid: number, @Param('uid') uid: number){
        return this.usersService.deleteUserInCourse(cid, uid)
    }

    @Get('getCourses/:uid')
    async getCourse(@Param('uid') uid: number): Promise<Courses[]>{
        return await this.usersService.getCoursesById(uid) as Courses[]
    }
}
