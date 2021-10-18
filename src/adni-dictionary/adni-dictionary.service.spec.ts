import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '../../config/typeorm.config';
import { AdniDictionaryService } from './adni-dictionary.service';
import { BrainPartRepository } from './brain-part.repository';

describe('AdniDictionaryService', () => {
  let service: AdniDictionaryService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(TypeOrmConfig), TypeOrmModule.forFeature([
        BrainPartRepository
      ])],
      providers: [AdniDictionaryService],
    }).compile();

    service = module.get<AdniDictionaryService>(AdniDictionaryService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
