import { Controller, Get, UseGuards, Param, Delete } from '@nestjs/common';
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

    
}
