
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
// jwt auth guard
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
