import { Test, TestingModule } from '@nestjs/testing';
import { AdniImagesController } from './adni-images.controller';

describe('AdniImagesController', () => {
  let controller: AdniImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdniImagesController],
    }).compile();

    controller = module.get<AdniImagesController>(AdniImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
