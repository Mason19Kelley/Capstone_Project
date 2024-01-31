import { Controller, UseGuards, Post, Request, Get, Body, Res } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './auth.model';
import { Response } from 'express';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { LoginLog } from '../loginlogs/loginlogs.entity';
import { LoginLogsService } from '../loginlogs/loginlogs.service';

import { ConfigService } from '@nestjs/config';
// controller for handling authentications
@Controller('auth')
@ApiTags('auth')
@ApiBearerAuth()
export class AuthController {
    constructor(private authService: AuthService, private userService: UsersService, private configService: ConfigService, private loginLogsService: LoginLogsService) {}

    // basic login endpoints
    @UseGuards(LocalAuthGuard)
    @ApiBody({ type: LoginDto })
    @Post('login')
    async login(@Res({ passthrough: true }) response: Response, @Body() credentials: LoginDto) {
        console.log(credentials)
        const token = (await this.authService.login(credentials)).access_token;
        console.log(token)
        let user: User = null;
        user = (await this.userService.findUser(credentials.email))
        response.cookie('token', token)
        return {token: token, user: user}
    }
    async handleLoginLog(username: string, success: boolean): Promise<void> {
        const timestamp = new Date().toISOString();
        const log = new LoginLog();
        log.user = username;
        log.Timestamp = timestamp;
        log.success = success;
        await this.loginLogsService.insertLog(log);
      }
    // auth testing endpoint
    // will return username if login works
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    async getProfile(@Request() req) {
        const email = req.user.email;
        const user = await this.userService.findUser(email);
        return user
    }
}
