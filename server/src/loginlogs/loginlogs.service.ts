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

    // function that can be called to find a log by timestamp
    findLog(Timestamp: string) {
        return this.logRepository.findOneBy({Timestamp: Timestamp})
    }

    // function that can be called to pull all logs
    findAllLogs() {
        return this.logRepository.find()
    }

    // function that can be called to insert a log
    insertLog(log: LoginLog) {
      const logEntity = this.logRepository.create(log)
      return this.logRepository.insert(logEntity)
    }



    // inserts default log into seed
    async seedLoginLogs() {
      const timestamp1 = new Date().toISOString();

        const logsToSeed = [
          { user: 'SuperAdmin', success: true, Timestamp: timestamp1 },
        ];
    
        const voteEntities = this.logRepository.create(logsToSeed)
        await this.logRepository.insert(voteEntities)
        
      }
}

