import { Test, TestingModule } from '@nestjs/testing';
import { SocialeController } from './sociale.controller';
import { SocialeService } from './sociale.service';

describe('SocialeController', () => {
  let controller: SocialeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocialeController],
      providers: [SocialeService],
    }).compile();

    controller = module.get<SocialeController>(SocialeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
