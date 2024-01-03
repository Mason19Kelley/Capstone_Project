
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RolesService } from '../roles/roles.service';
import { OrganizationsService } from '../organizations/organizations.service';

@Injectable()
export class UsersService {
    constructor(
        private orgsService: OrganizationsService,
        private rolesService: RolesService,
        @InjectRepository(User)
        private usersRepository: Repository<User>,    
      ) {}

  async findUser(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({username})
  }

  async seedUsers() {

    let users = await this.usersRepository.count();

    if(users > 0) return

    const hashedPass = await bcrypt.hash("password", 10);

    const organization = await this.orgsService.findOrg(1);
    const role = await this.rolesService.findRole(1);

    const usersToSeed = [
      { username: 'username', password: hashedPass, organization, role},
      
    ];

    const voteEntities = this.usersRepository.create(usersToSeed)
    await this.usersRepository.insert(voteEntities)
    
  }
}
