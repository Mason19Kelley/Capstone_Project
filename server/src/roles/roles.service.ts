import { Injectable } from '@nestjs/common';
import { Role } from './role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// business logic for roles
@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private rolesRepository: Repository<Role>,
      ) {}

    // finds role by id
    findRole(id: number) {
      return this.rolesRepository.findOneBy({id: id })
    }

    findRoleByName(roleName: string) {
      return this.rolesRepository.findOneBy({ roleName })
    }
    // inserts roles seeds into db
    async seedRoles() {

        let roles = await this.rolesRepository.count();
    
        if(roles > 0) return
    
        const rolesToSeed = [
          { roleName: 'Systems Admin' },
          { roleName: 'Administrator' },
          { roleName: 'User' },
        ];
    
        const voteEntities = this.rolesRepository.create(rolesToSeed)
        await this.rolesRepository.insert(voteEntities)
        
      }
}
