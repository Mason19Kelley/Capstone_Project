import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { OrganizationsService } from './organizations/organizations.service';
import { OrganizationsModule } from './organizations/organizations.module';
import { RolesModule } from './roles/roles.module';
import { Organization } from './organizations/organization.entity';
import { User } from './users/user.entity';
import { Role } from './roles/role.entity';
import { Quiz } from './quiz/quiz.entity';
import { SeedService } from './seed/seed.service';
import { CoursesModule } from './courses/courses.module';
import { Courses } from './courses/courses.entity';
import { LoginLog } from './loginlogs/loginlogs.entity';
import { LoginlogsModule } from './loginlogs/loginlogs.module';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { CreateOrgModule } from './createOrg/createOrg.module';
import { PostmarkService } from './postmark/postmark.service';
import { PostmarkModule } from './postmark/postmark.module';
import { StorageModule } from './storage/storage.module';
import { FileModule } from './file/file.module';
import { QuizModule } from './quiz/quiz.module';
import { CourseCompletion } from './courses/course-completion.entity';

// sets up db/typeorm connection and loads all modules into app
@Module({
  imports: [
     TypeOrmModule.forRootAsync({
       imports: [ConfigModule],
       inject: [ConfigService],
       useFactory: (configService: ConfigService) => ({
         type: 'postgres',
         host: configService.get<string>('ENVIRONMENT') === 'prod' ? 'postgres' : 'localhost',
         port: 5432,
         username: "surge-user",
         password: 'password',
         database: 'surge',
         entities: [User, Organization, Role, LoginLog, Courses, Quiz, CourseCompletion],
         synchronize: true,
         migrations: ["src/migration/**/*.ts"],
       }),
     }),
     ConfigModule.forRoot({
       ignoreEnvFile: false,
       isGlobal: true
     }),
     AuthModule,
     UsersModule,
     OrganizationsModule,
     RolesModule,
     CreateOrgModule,
     CoursesModule,
     PostmarkModule,
     LoginlogsModule,
     StorageModule,
     FileModule,
     QuizModule
  ],
  controllers: [AppController],
  providers: [AppService, SeedService, PostmarkService],
 })
export class AppModule implements OnApplicationBootstrap  {
  constructor(private readonly seedService: SeedService) {}
  // lifecycle hook on app start
  //currently seeds db
  async onApplicationBootstrap() {
    await this.seedService.seedDB();
  }
}
