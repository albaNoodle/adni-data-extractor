import { Test, TestingModule } from '@nestjs/testing';
import { AdniDictionaryService } from './adni-dictionary.service';

describe('AdniDictionaryService', () => {
  let service: AdniDictionaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdniDictionaryService],
    }).compile();

    service = module.get<AdniDictionaryService>(AdniDictionaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
