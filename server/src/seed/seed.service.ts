import { Injectable } from '@nestjs/common';
import { RolesService } from '../roles/roles.service';
import { UsersService } from '../users/users.service';
import { OrganizationsService } from '../organizations/organizations.service';
import { CoursesService } from 'src/courses/courses.service';
import { LoginLogsService } from '../loginlogs/loginlogs.service';
// seed service to store seed business logic
@Injectable()
export class SeedService {
    constructor(
        private rolesService: RolesService,
        private usersService: UsersService,
        private orgsService: OrganizationsService,
        private coursesService: CoursesService,
        private logsService: LoginLogsService,
      ) {}

  // individually calls each service to seed their tables
  async seedDB() {

    await this.rolesService.seedRoles();
    await this.orgsService.seedOrganizations();
    await this.usersService.seedUsers();
    await this.coursesService.seedCourses();
    await this.logsService.seedLoginLogs();
    
  }
}
