import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { OrganizationsService } from '../organizations/organizations.service';
import * as bcrypt from 'bcrypt';
import { RolesService } from '../roles/roles.service';

// auth business logic service
@Injectable()
export class createOrgService {
    constructor(
        private orgsService: OrganizationsService,
        private usersService: UsersService,
        private rolesService: RolesService,
    ){}

//function to seperate user and org data and calls appropriate functions to insert into db
  async insert(data) {

    const hashedPass = await bcrypt.hash(data.password, 10);

    console.log("inserting")


    const orgsToSeed = [
        { orgName: data.organization }
      ];
    await this.orgsService.insert(orgsToSeed);

    const organization = await this.orgsService.findOrgByName(data.organization);
    const role = await this.rolesService.findRole(1);

    const usersToSeed = [
      { fullName: data.fullName, password: hashedPass, email: data.email, organization: organization,  role: role}
    ];
    console.log(usersToSeed)
    await this.usersService.insert(usersToSeed);
  }


}