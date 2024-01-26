import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { LoginLogsService } from '../loginlogs/loginlogs.service';
import { LoginLog } from '../loginlogs/loginlogs.entity';
// auth business logic service
@Injectable()
export class AuthService {
  saltRounds = 10; // don't change
  constructor(private usersService: UsersService,
    private jwtService: JwtService,
    private loginLogsService: LoginLogsService,
    ) {}

    // validates user login
    // used by auth guard
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findUser(username);
    const hashedPassMatches = await bcrypt.compare(pass, user.password);
    console.log(hashedPassMatches)

    

    if (user && hashedPassMatches) {
      const { password, ...result } = user;

      return result;
    }
    return null;
  }
  // generates auth token in login endpoint
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  

}