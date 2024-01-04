
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// local auth guard for login endpoint
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
