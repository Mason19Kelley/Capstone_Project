import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginLog } from '../loginlogs/loginlogs.entity';
import { LoginLogsService } from '../loginlogs/loginlogs.service';
// local guard strategy
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
 constructor(private authService: AuthService, private loginLogsService: LoginLogsService) {
    super({
      usernameField: 'email', 
      passwordField: 'password',
    });
 }

 async validate(email: string, password: string): Promise<any> {
  try{
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    //If the user is valid, log the login attempt
    this.loginLogsService.handleLoginLog(email, true);
    return user;
  } catch (e) {
    //If the user is invalid, log the login attempt
    this.loginLogsService.handleLoginLog(email, false);
  }
 }


}
