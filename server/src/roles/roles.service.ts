import { Injectable } from '@nestjs/common';
import { Role } from './role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Role)
        private rolesRepository: Repository<Role>,
      ) {}

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
