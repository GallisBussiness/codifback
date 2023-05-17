import { Test, TestingModule } from '@nestjs/testing';
import { SocialeService } from './sociale.service';

describe('SocialeService', () => {
  let service: SocialeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SocialeService],
    }).compile();

    service = module.get<SocialeService>(SocialeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
