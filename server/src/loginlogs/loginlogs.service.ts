import { Injectable } from '@nestjs/common';
import { LoginLog } from './loginlogs.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// business logic for orgs
@Injectable()
export class LoginLogsService {
    constructor(
        @InjectRepository(LoginLog)
        private logRepository: Repository<LoginLog>,
      ) {}
    // gets org by id
    findLog(Timestamp: number) {
        return this.logRepository.findOneBy({Timestamp: Timestamp})
    }

    // inserts default log into seed
    async seedLoginLogs() {

        let log = await this.logRepository.count();
    
        if(log > 0) return
    
    
        const logsToSeed = [
          { user: 'SuperAdmin', success: true, Timestamp: 0},
          
        ];
    
        const voteEntities = this.logRepository.create(logsToSeed)
        await this.logRepository.insert(voteEntities)
        
      }
}
export class LoginlogsService {}
