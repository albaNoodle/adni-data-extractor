import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { initAppForTestModule } from '../test/utils';
import { TypeOrmConfig } from '../../config/typeorm.config';
import * as request from 'supertest';
import { EntityManager } from 'typeorm';
import { AdniImagesModule } from './adni-images.module';
import { AdniImage } from '../entities/adni-image.entity';
import { Phenotype } from '../entities/phenotype.entity';

describe('AdniDictionaryController', () => {
  let app: INestApplication;
  let entityManager: EntityManager;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(TypeOrmConfig), AdniImagesModule]
    }).compile();

    entityManager = module.get<EntityManager>(EntityManager);
    app = await initAppForTestModule(module);
  });

  beforeEach(async () => {
    await entityManager.delete(AdniImage, { })
    await entityManager.delete(Phenotype, { })
  })

  afterAll(async () => {
    await app.close();
    app = null;
  });

  describe('loadAdniImages', () =>{
    it('success', async () => {
      const adniImagesNb = (await entityManager.find(AdniImage, {})).length;
      expect(adniImagesNb).toBe(0);

      const phenotypesNb = (await entityManager.find(Phenotype, {})).length;
      expect(phenotypesNb).toBe(0);

      const response = await request(
        app.getHttpServer()).post('/adni-images').send({path: 'data/test/phenotypes.csv'});

      expect(response.status).toEqual(201);

      const result = await entityManager.find(AdniImage, {});
      expect(result.length).toBeGreaterThan(adniImagesNb);

      expect(result.map((ai) => ai.imageUid)).toContain(1);
      expect(result.map((ai) => ai.imageUid)).toContain(2);
      expect(result.map((ai) => ai.imageUid)).toContain(3);

      const resultPh = await entityManager.find(Phenotype, {});
      expect(resultPh.length).toBeGreaterThan(phenotypesNb);

      expect(resultPh.map((ph) => ph.value)).toContain(75103);
      expect(resultPh.map((ph) => ph.value)).toContain(75100);
      expect(resultPh.map((ph) => ph.value)).toContain(75102);
    });
  });
});
