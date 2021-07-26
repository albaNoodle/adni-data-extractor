import { Test, TestingModule } from '@nestjs/testing';
import { AdniReaderController } from './adni-reader.controller';

describe('AdniReaderController', () => {
  let controller: AdniReaderController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdniReaderController],
    }).compile();

    controller = module.get<AdniReaderController>(AdniReaderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
