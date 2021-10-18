import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '../../config/typeorm.config';
import { AdniImageRepository } from './adni-image.repository';
import { AdniImagesService } from './adni-images.service';
import { PhenotypeRepository } from './phenotype.repository';

describe('AdniImagesService', () => {
  let service: AdniImagesService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(TypeOrmConfig), TypeOrmModule.forFeature([AdniImageRepository, PhenotypeRepository])],
      providers: [AdniImagesService],
    }).compile();

    service = module.get<AdniImagesService>(AdniImagesService);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
