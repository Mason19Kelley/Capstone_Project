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
    findLog(Timestamp: string) {
        return this.logRepository.findOneBy({Timestamp: Timestamp})
    }

    insertLog(log: LoginLog) {
      const logEntity = this.logRepository.create(log)
      return this.logRepository.insert(logEntity)
    }

    // inserts default log into seed
    async seedLoginLogs() {
    
        const logsToSeed = [
          { user: 'SuperAdmin', success: true, Timestamp: "2020-04-20 12:00:00" },
          { user: 'test', success: true, Timestamp: "2020-04-20 12:00:01" },

        ];
    
        const voteEntities = this.logRepository.create(logsToSeed)
        await this.logRepository.insert(voteEntities)
        
      }
}

