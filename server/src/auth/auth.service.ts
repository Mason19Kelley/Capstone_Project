import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
// auth business logic service
@Injectable()
export class AuthService {
  saltRounds = 10; // don't change
  constructor(private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
 
    // validates user login
    // used by auth guard
  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findUser(email);
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
    const payload = { username: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  

}