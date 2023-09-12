import { Test, TestingModule } from '@nestjs/testing';
import { UfrController } from './ufr.controller';
import { UfrService } from './ufr.service';

describe('UfrController', () => {
  let controller: UfrController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UfrController],
      providers: [UfrService],
    }).compile();

    controller = module.get<UfrController>(UfrController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
