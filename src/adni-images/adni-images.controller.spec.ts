import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfig } from '../../config/typeorm.config';
import { AdniImageRepository } from './adni-image.repository';
import { AdniImagesController } from './adni-images.controller';
import { AdniImagesService } from './adni-images.service';
import { PhenotypeRepository } from './phenotype.repository';

describe('AdniImagesController', () => {
  let controller: AdniImagesController;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(TypeOrmConfig), TypeOrmModule.forFeature([ AdniImageRepository, PhenotypeRepository ])],
      controllers: [AdniImagesController],
      providers: [AdniImagesService]
    }).compile();

    controller = module.get<AdniImagesController>(AdniImagesController);
  });

  afterAll(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
