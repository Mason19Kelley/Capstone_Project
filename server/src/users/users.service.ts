
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { DeleteResult, Equal, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { RolesService } from '../roles/roles.service';
import { OrganizationsService } from '../organizations/organizations.service';


// user business logic class
@Injectable()
export class UsersService {
    constructor(
        private orgsService: OrganizationsService,
        private rolesService: RolesService,
        @InjectRepository(User)
        private usersRepository: Repository<User>,    
      ) {}
  // finds user by username
  async findUser(username: string): Promise<User | undefined> {
    return this.usersRepository.findOneBy({username})
  }

  async findUserById(id: number): Promise<User | undefined> {
    return this.usersRepository.findOneBy({id});
  }

    async getUsersByOrg(orgId: number): Promise<User[] | undefined>{
    return this.usersRepository.find({ where: { organization: Equal(orgId) } });
  }

  async deleteUser(id:number): Promise<DeleteResult | undefined> {
    return this.usersRepository.delete({ id })
  }

  async insert(data) {
    const dataEntity = this.usersRepository.create(data)
    await this.usersRepository.insert(dataEntity)
    console.log("inserted user")
  }
  
  // inserts a default users into db
  async seedUsers() {

    let users = await this.usersRepository.count();

    if(users > 0) return

    const hashedPass = await bcrypt.hash("password", 10);

    const organization1 = await this.orgsService.findOrg(1);
    const organization2 = await this.orgsService.findOrg(2);

    const superAdmin = await this.rolesService.findRole(1);
    const admin = await this.rolesService.findRole(2);
    const regularRole = await this.rolesService.findRole(3);

    const usersToSeed = [
      //{ username: 'username', password: hashedPass, organization: organization, role:role, email: "email", orgName: "orgName"}
      { username: 'username', email: 'mkk020@latech.edu', password: hashedPass, organization: organization1, role: superAdmin},
      { username: 'admin', email: 'mkk020+a@latech.edu', password: hashedPass, organization: organization1, role: admin},
      { username: 'user', email: 'mkk020+b@latech.edu', password: hashedPass, organization: organization1, role: regularRole},
      { username: 'user2', email: 'mkk020+c@latech.edu', password: hashedPass, organization: organization2, role: regularRole}
    ];

    
    const newUsers = this.usersRepository.create(usersToSeed);
    console.log(newUsers)
    await this.usersRepository.insert(newUsers);
   
    
  }
}
