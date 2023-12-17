import { Injectable } from '@nestjs/common';
import { Organization } from './organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrganizationsService {
    constructor(
        @InjectRepository(Organization)
        private orgsRepository: Repository<Organization>,
      ) {}

    findOrg(id: number) {
        return this.orgsRepository.findOneBy({id: id })
    }

    async seedOrganizations() {

        let orgs = await this.orgsRepository.count();
    
        if(orgs > 0) return
    
    
        const orgsToSeed = [
          { orgName: 'Big Pharma'},
          
        ];
    
        const voteEntities = this.orgsRepository.create(orgsToSeed)
        await this.orgsRepository.insert(voteEntities)
        
      }
}
