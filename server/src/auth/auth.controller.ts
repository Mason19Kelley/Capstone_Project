import { Controller, UseGuards, Post, Request, Get, Body, Res } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto, ResetPasswordRequestDto } from './auth.model';
import { Response } from 'express';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { LoginLogsService } from '../loginlogs/loginlogs.service';

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
        const token = (await this.authService.login(credentials)).access_token;
        let user: User = null;
        user = (await this.userService.findUser(credentials.email))
        response.cookie('token', token)
        return {token: token, user: user}
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

    @Post('requestResetPassword')
    async requestResetPassword(@Body('email') email: string){
        this.authService.requestResetPassword(email)
    }

    @Post("resetPassword")
    async resetPassword(@Body() body: ResetPasswordRequestDto) {
        const { userId, token, password } = body;
        return this.authService.resetPassword(userId as unknown as number, token, password);
    }

    @Get('getLogs')
    async getLogs(){
        const logOutput = await this.loginLogsService.findAllLogs()
        return logOutput
    }

}
