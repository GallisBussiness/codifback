import { Test, TestingModule } from '@nestjs/testing';
import { UfrService } from './ufr.service';

describe('UfrService', () => {
  let service: UfrService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UfrService],
    }).compile();

    service = module.get<UfrService>(UfrService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
