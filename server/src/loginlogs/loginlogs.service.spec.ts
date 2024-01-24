import { Test, TestingModule } from '@nestjs/testing';
import { LoginlogsService } from './loginlogs.service';

describe('LoginlogsService', () => {
  let service: LoginlogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginlogsService],
    }).compile();

    service = module.get<LoginlogsService>(LoginlogsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
