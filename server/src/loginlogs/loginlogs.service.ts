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
    findAllLogs(orgID: number) {
      const organizationID = parseInt(orgID['orgID'])
      console.log(typeof(organizationID))
        return this.logRepository
        .createQueryBuilder('log')
        .select(['log.Timestamp', 'log.user', 'log.success'])
        .where('log.orgID = :orgID', {orgID: organizationID})
        .getMany()
    }

    // function that can be called to insert a log
    insertLog(log: LoginLog) {
      const logEntity = this.logRepository.create(log)
      return this.logRepository.insert(logEntity)
    }

     //Function that logs the login attempt
  async handleLoginLog(username: string, success: boolean, orgID: number): Promise<void> {
    console.log(orgID)
    const timestamp = new Date().toISOString();
    const log = new LoginLog();
    log.user = username;
    log.Timestamp = timestamp;
    log.success = success;
    log.orgID = orgID;
    await this.insertLog(log);
  }

    // inserts default log into seed
    async seedLoginLogs() {
      const timestamp1 = new Date().toISOString();

        const logsToSeed = [
          { user: 'SuperAdmin@example.com', success: true, Timestamp: timestamp1, orgID: 1},
        ];
    
        const voteEntities = this.logRepository.create(logsToSeed)
        await this.logRepository.insert(voteEntities)
        
      }
}

