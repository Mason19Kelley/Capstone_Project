import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { OrganizationsService } from '../organizations/organizations.service';
import * as bcrypt from 'bcrypt';

// auth business logic service
@Injectable()
export class createOrgService {
    constructor(
        private orgsService: OrganizationsService,
        private usersService: UsersService,
    ){}

//function to seperate user and org data and calls appropriate functions to insert into db
  async insert(data) {

    const hashedPass = await bcrypt.hash(data.password, 10);

    const usersToSeed = [
        { username: data.username, password: hashedPass, email: data.email, orgName: data.orgName, adminName: data.adminName, role: data.role}
      ];

    const orgsToSeed = [
        { orgName: data.orgName, adminName: data.adminName }
      ];

    console.log("inserting")
    await this.orgsService.insert(orgsToSeed);
    await this.usersService.insert(usersToSeed);
  }


}