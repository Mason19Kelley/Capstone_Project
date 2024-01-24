import { Controller, UseGuards, Post, Request, Get, Body, Res } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './auth.model';
import { Response } from 'express';
import { User } from '../users/user.entity';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
// controller for handling authentications
@Controller('auth')
@ApiTags('auth')
@ApiBearerAuth()
export class AuthController {
    constructor(private authService: AuthService, private userService: UsersService, private configService: ConfigService) {}

    // basic login endpoints
    @UseGuards(LocalAuthGuard)
    @ApiBody({ type: LoginDto })
    @Post('login')
    async login(@Res({ passthrough: true }) response: Response, @Body() credentials: LoginDto) {
        const token = (await this.authService.login(credentials)).access_token;
        let user: User = null;
        user = (await this.userService.findUser(credentials.username))
        response.cookie('token', token, {sameSite:"none", secure: true})
        return {token: token, user: user}
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
