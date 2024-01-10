
import { Module, forwardRef } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { OrganizationsModule } from '../organizations/organizations.module';
import { RolesModule } from '../roles/roles.module';
import { UsersController } from './users.controller';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Module({
  imports: [TypeOrmModule.forFeature([User]), OrganizationsModule, RolesModule],
  providers: [UsersService, JwtAuthGuard],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
