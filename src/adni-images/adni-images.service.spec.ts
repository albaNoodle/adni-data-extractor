import { Test, TestingModule } from '@nestjs/testing';
import { AdniImagesService } from './adni-images.service';

describe('AdniImagesService', () => {
  let service: AdniImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdniImagesService],
    }).compile();

    service = module.get<AdniImagesService>(AdniImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
