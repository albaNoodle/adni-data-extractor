import { Test, TestingModule } from '@nestjs/testing';
import { AdniDictionaryController } from './adni-dictionary.controller';

describe('AdniDictionaryController', () => {
  let controller: AdniDictionaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdniDictionaryController],
    }).compile();

    controller = module.get<AdniDictionaryController>(AdniDictionaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
