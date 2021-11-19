import { Test, TestingModule } from '@nestjs/testing';
import { AdniReaderService } from './adni-reader.service';

describe('AdniReaderService', () => {
  let service: AdniReaderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdniReaderService],
    }).compile();

    service = module.get<AdniReaderService>(AdniReaderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
