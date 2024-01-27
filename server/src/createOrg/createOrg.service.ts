import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
// auth business logic service
@Injectable()
export class createOrgService {
   // don't change
  createOrg() {
    return("success")
  }


}