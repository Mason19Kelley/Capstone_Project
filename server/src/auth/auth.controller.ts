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

// controller for handling authentications
@Controller('auth')
@ApiTags('auth')
@ApiBearerAuth()
export class AuthController {
    constructor(private authService: AuthService, private userService: UsersService, private loginLogsService: LoginLogsService) {}

    // basic login endpoints
    @UseGuards(LocalAuthGuard)
    @ApiBody({ type: LoginDto })
    @Post('login')
    async login(@Res({ passthrough: true }) response: Response, @Body() credentials: LoginDto) {
            const token = await this.authService.login(credentials)
            .then(async (res) => {
                // res.access_token
                let user: User = null;
    
                await this.handleLoginLog(credentials.username, true);
                console.log("abc")
                user = await this.userService.findUser(credentials.username);
                console.log('there')
                response.cookie('token', token);
                console.log("final")
                return { token, user };
            })
            .catch(async (err) => {
                console.log("here")
                await this.handleLoginLog(credentials.username, false);
            });
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
        const userName = req.user.username;
        const user = await this.userService.findUser(userName);
        return user
    }
}
