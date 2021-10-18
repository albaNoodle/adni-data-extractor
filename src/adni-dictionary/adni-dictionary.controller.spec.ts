import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '../../config/typeorm.config';
import { AdniDictionaryController } from './adni-dictionary.controller';
import { AdniDictionaryService } from './adni-dictionary.service';
import { BrainPartRepository } from './brain-part.repository';

describe('AdniDictionaryController', () => {
  let controller: AdniDictionaryController;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(TypeOrmConfig), TypeOrmModule.forFeature([
        BrainPartRepository
      ])],
      providers: [AdniDictionaryService],
      controllers: [AdniDictionaryController],
    }).compile();

    controller = module.get<AdniDictionaryController>(AdniDictionaryController);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
