import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { Organization } from '../organizations/organization.entity';
import { OrganizationsService } from '../organizations/organizations.service';
import { User } from '../users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// auth business logic service
@Injectable()
export class createOrgService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ){}


  async insert(data) {

    const usersToSeed = [
        { username: data.username, password: data.password, email: data.adminEmail, orgName: data.orgName, adminName: data.adminName, role: data.role}
      ];

    const orgsToSeed = [
        { orgName: data.orgName, adminName: data.adminName }
      ];

    // const orgEntities = OrganizationsService.orgsRepository.create(orgsToSeed)
    // await this.orgsRepository.insert(orgEntities)
    const userEntities = this.usersRepository.create(usersToSeed)
    await this.usersRepository.insert(userEntities)
    return(data)
  }


}