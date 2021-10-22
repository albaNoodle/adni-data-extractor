import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { initAppForTestModule } from '../test/utils';
import { TypeOrmConfig } from '../../config/typeorm.config';
import * as request from 'supertest';
import { EntityManager, In } from 'typeorm';
import { AdniImagesModule } from './adni-images.module';
import { AdniImage } from '../entities/adni-image.entity';
import { Phenotype } from '../entities/phenotype.entity';

describe('AdniDictionaryController', () => {
  let app: INestApplication;
  let entityManager: EntityManager;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(TypeOrmConfig), AdniImagesModule],
    }).compile();

    entityManager = module.get<EntityManager>(EntityManager);
    app = await initAppForTestModule(module);
  });

  beforeEach(async () => {
    await entityManager.delete(AdniImage, {});
  });

  afterAll(async () => {
    await app.close();
    app = null;
  });

  describe('loadAdniImages', () => {
    it('success', async () => {
      const adniImagesNb = (await entityManager.find(AdniImage, {})).length;
      expect(adniImagesNb).toBe(0);

      const phenotypesNb = (await entityManager.find(Phenotype, {})).length;
      expect(phenotypesNb).toBe(0);

      await request(app.getHttpServer()).post('/adni-images').send({ path: 'data/test/phenotypes.csv' }).expect(201);

      const result1 = await entityManager.find(AdniImage, {});
      expect(result1.length).toBeGreaterThan(adniImagesNb);

      expect(result1.map((ai) => ai.imageUid)).toContain(1);
      expect(result1.map((ai) => ai.imageUid)).toContain(2);
      expect(result1.map((ai) => ai.imageUid)).toContain(3);

      const resultPh1 = await entityManager.find(Phenotype, {});
      expect(resultPh1.length).toBeGreaterThan(phenotypesNb);

      expect(resultPh1.map((ph) => ph.value)).toContain(75103);
      expect(resultPh1.map((ph) => ph.value)).toContain(75100);
      expect(resultPh1.map((ph) => ph.value)).toContain(75102);

      // delete some brain parts

      await entityManager.delete(AdniImage, { imageUid: In([1, 2, 3]) });
      const result2 = await entityManager.find(AdniImage, {});
      expect(result2.length).toEqual(result1.length - 3);
      expect(result2.map((ai) => ai.imageUid)).not.toContain(1);
      expect(result2.map((ai) => ai.imageUid)).not.toContain(2);
      expect(result2.map((ai) => ai.imageUid)).not.toContain(3);
      const resultPh2 = await entityManager.find(Phenotype, {});
      expect(resultPh2.length).toBeLessThan(resultPh1.length);

      // reload
      await request(app.getHttpServer()).post('/adni-images').send({ path: 'data/test/phenotypes.csv' }).expect(201);
      const result3 = await entityManager.find(AdniImage, {});
      expect(result3.length).toEqual(result1.length);
      expect(result3.map((ai) => ai.imageUid)).toContain(1);
      expect(result3.map((ai) => ai.imageUid)).toContain(2);
      expect(result3.map((ai) => ai.imageUid)).toContain(3);

      const resultPh3 = await entityManager.find(Phenotype, {});
      expect(resultPh3.length).toEqual(resultPh1.length);
    });
  });
});
