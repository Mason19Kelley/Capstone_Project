import { Injectable } from '@nestjs/common';
import { RolesService } from '../roles/roles.service';
import { UsersService } from '../users/users.service';
import { OrganizationsService } from '../organizations/organizations.service';

@Injectable()
export class SeedService {
    constructor(
        private rolesService: RolesService,
        private usersService: UsersService,
        private orgsService: OrganizationsService
      ) {}

  async seedDB() {

    await this.rolesService.seedRoles();
    await this.orgsService.seedOrganizations();
    await this.usersService.seedUsers();
    
  }
}
