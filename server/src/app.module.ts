import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrganizationsService } from './organizations/organizations.service';
import { OrganizationsModule } from './organizations/organizations.module';
import { RolesModule } from './roles/roles.module';
import { DataSource } from 'typeorm';
import { Organization } from './organizations/organization.entity';
import { User } from './users/user.entity';
import { Role } from './roles/role.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'surge',
      entities: [User, Organization, Role],
      synchronize: true,
      migrations: ["src/migration/**/*.ts"],
      
    }),
    AuthModule,
    UsersModule,
    OrganizationsModule,
    RolesModule,
    
  ],
  controllers: [AppController],
  providers: [AppService, OrganizationsService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
