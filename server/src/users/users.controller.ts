import { Controller, Get, UseGuards, Param, Delete, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';

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
    
    @Post('insertUser')
    async insertUser(@Param( 'cid') cid: number, @Param('uid') uid: number) {
        return this.usersService.insertUserInCourse(cid, uid)
    }

    @Delete('deleteUserInCourse/:cid/:uid')
    async deleteUserInCourse(@Param('cid') cid: number, @Param('uid') uid: number){
        return this.usersService.deleteUserInCourse(cid, uid)
    }
}
