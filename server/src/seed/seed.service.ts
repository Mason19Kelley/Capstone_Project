import { Injectable } from '@nestjs/common';
import { RolesService } from 'src/roles/roles.service';
import { UsersService } from 'src/users/users.service';
import { OrganizationsService } from 'src/organizations/organizations.service';

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
