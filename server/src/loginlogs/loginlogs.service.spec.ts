import { Test, TestingModule } from '@nestjs/testing';
import { LoginLogsService } from './loginlogs.service';

describe('LoginLogsService', () => {
  let service: LoginLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginLogsService],
    }).compile();

    service = module.get<LoginLogsService>(LoginLogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
