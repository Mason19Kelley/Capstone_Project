import { Module, OnApplicationBootstrap } from '@nestjs/common';
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
import { SeedService } from './seed/seed.service';

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
  providers: [AppService, OrganizationsService, SeedService],
})
export class AppModule implements OnApplicationBootstrap  {
  constructor(private dataSource: DataSource, private readonly seedService: SeedService) {}

  async onApplicationBootstrap() {
    await this.seedService.seed();
  }
}
