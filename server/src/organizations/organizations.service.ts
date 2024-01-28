import { Injectable } from '@nestjs/common';
import { Organization } from './organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// business logic for orgs
@Injectable()
export class OrganizationsService {
    constructor(
        @InjectRepository(Organization)
        private orgsRepository: Repository<Organization>,
      ) {}
    // gets org by id
    findOrg(id: number) {
        return this.orgsRepository.findOneBy({id: id })
    }

    getOrgsRepository(): Repository<Organization> {
      return this.orgsRepository;
  }

    async insert(data) {
        const dataEntity = this.orgsRepository.create(data)
        await this.orgsRepository.insert(dataEntity)
        console.log("inserted org")
      }

    // inserts default organization into seed
    async seedOrganizations() {

        let orgs = await this.orgsRepository.count();
    
        if(orgs > 0) return
    
    
        const orgsToSeed = [
          { orgName: 'Big Pharma', adminName: 'Dr. Evil' },
          
        ];
    
        const voteEntities = this.orgsRepository.create(orgsToSeed)
        await this.orgsRepository.insert(voteEntities)
        
      }
}
