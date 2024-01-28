import { Injectable } from '@nestjs/common';
import { Organization } from './organization.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { OrgRenameDto } from './orgRename.model';
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

    findOrgByName(orgName: string) {
        return this.orgsRepository.findOneBy({orgName: orgName })
    }

    getOrgsRepository(): Repository<Organization> {
      return this.orgsRepository;
    }

    async insert(data) {
        const dataEntity = this.orgsRepository.create(data)
        await this.orgsRepository.insert(dataEntity)
        console.log("inserted org")
      }

    async renameOrg(orgRename: OrgRenameDto) {
      let id: number = orgRename.id
      const org = await this.orgsRepository.findOneBy( { id } );

      if (!org) {
          throw new Error(`Organization with ID ${orgRename.id} not found.`);
      }

      org.orgName = orgRename.orgName;
      await this.orgsRepository.save(org);

      return true

    }

    // inserts default organization into seed
    async seedOrganizations() {

        let orgs = await this.orgsRepository.count();
    
        if(orgs > 0) return
    
    
        const orgsToSeed = [
          { orgName: 'Big Pharma', adminName: 'Dr. Evil' },
          { orgName: 'Amazon' }
          
        ];
    
        const voteEntities = this.orgsRepository.create(orgsToSeed)
        await this.orgsRepository.insert(voteEntities)
        
      }
}
