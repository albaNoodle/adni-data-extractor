import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { initAppForTestModule } from '../test/utils';
import { TypeOrmConfig } from '../../config/typeorm.config';
import * as request from 'supertest';
import { AdniDictionaryModule } from './adni-dictionary.module';
import { EntityManager, In } from 'typeorm';
import { BrainPart } from '../entities/brain-part.entity';

describe('AdniDictionaryController', () => {
  let app: INestApplication;
  let entityManager: EntityManager;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(TypeOrmConfig), AdniDictionaryModule],
    }).compile();

    entityManager = module.get<EntityManager>(EntityManager);
    app = await initAppForTestModule(module);
  });

  beforeEach(async () => {
    await entityManager.delete(BrainPart, {});
  });

  afterAll(async () => {
    await app.close();
    app = null;
  });

  describe('loadAdniDictionary', () => {
    it('success', async () => {
      const brainPartsNb = (await entityManager.find(BrainPart, {})).length;
      expect(brainPartsNb).toBe(0);

      // load all brain parts
      await request(app.getHttpServer()).post('/adni-dictionaries').send({ path: 'data/test/dictionary.csv' }).expect(201);

      const result1 = await entityManager.find(BrainPart, {});
      expect(result1.length).toBeGreaterThan(brainPartsNb);

      expect(result1.map((bp) => bp.keyname)).toContain('ST1SV');
      expect(result1.map((bp) => bp.keyname)).toContain('ST2SV');
      expect(result1.map((bp) => bp.keyname)).toContain('ST3SV');

      // delete some brain parts

      await entityManager.delete(BrainPart, { keyname: In(['ST1SV', 'ST2SV', 'ST3SV']) });
      const result2 = await entityManager.find(BrainPart, {});
      expect(result2.length).toEqual(result1.length - 3);
      expect(result2.map((bp) => bp.keyname)).not.toContain('ST1SV');
      expect(result2.map((bp) => bp.keyname)).not.toContain('ST2SV');
      expect(result2.map((bp) => bp.keyname)).not.toContain('ST3SV');

      // reload
      await request(app.getHttpServer()).post('/adni-dictionaries').send({ path: 'data/test/dictionary.csv' }).expect(201);
      const result3 = await entityManager.find(BrainPart, {});
      expect(result3.length).toEqual(result1.length);
      expect(result3.map((bp) => bp.keyname)).toContain('ST1SV');
      expect(result3.map((bp) => bp.keyname)).toContain('ST2SV');
      expect(result3.map((bp) => bp.keyname)).toContain('ST3SV');
    });
  });
});
