import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/role.entity';
import { RolesService } from 'src/roles/roles.service';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService {
    constructor(
        private rolesService: RolesService
      ) {}

  async seed() {

    await this.rolesService.seedRoles();
    
  }
}
