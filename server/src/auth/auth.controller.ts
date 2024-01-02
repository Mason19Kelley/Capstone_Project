import { Controller, UseGuards, Post, Request, Get, Body, Res } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiBasicAuth, ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './auth.model';
import { Response } from 'express';

@Controller('auth')
@ApiTags('auth')
@ApiBearerAuth()
export class AuthController {
    constructor(private authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @ApiBody({ type: LoginDto })
    @Post('login')
    async login(@Res({ passthrough: true }) response: Response, @Body() credentials: LoginDto) {
        console.log(credentials)
        
        const token = (await this.authService.login(credentials)).access_token;
        console.log(token)
        response.cookie('jwt', token);
        return token
    }
    // testing that auth works
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }
}
