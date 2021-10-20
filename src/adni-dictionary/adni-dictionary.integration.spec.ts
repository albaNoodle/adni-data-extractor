import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { initAppForTestModule } from '../test/utils';
import { TypeOrmConfig } from '../../config/typeorm.config';
import * as request from 'supertest';
import { AdniDictionaryModule } from './adni-dictionary.module';
import { EntityManager } from 'typeorm';
import { BrainPart } from '../entities/brain-part.entity';

describe('AdniDictionaryController', () => {
  let app: INestApplication;
  let entityManager: EntityManager;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TypeOrmModule.forRoot(TypeOrmConfig), AdniDictionaryModule]
    }).compile();

    entityManager = module.get<EntityManager>(EntityManager);
    app = await initAppForTestModule(module);
  });

  beforeEach(async () => {
    await entityManager.delete(BrainPart, { })
  })

  afterAll(async () => {
    await app.close();
    app = null;
  });

  describe('loadAdniDictionary', () =>{
    it('success', async () => {
      const brainPartsNb = (await entityManager.find(BrainPart, {})).length;
      expect(brainPartsNb).toBe(0);

      const response = await request(
        app.getHttpServer()).post('/adni-dictionaries').send({path: 'data/test/dictionary.csv'});

      expect(response.status).toEqual(201);
      const result = await entityManager.find(BrainPart, {});
      expect(result.length).toBeGreaterThan(brainPartsNb);

      expect(result.map((bp) => bp.keyname)).toContain('ST1SV');
      expect(result.map((bp) => bp.keyname)).toContain('ST2SV');
      expect(result.map((bp) => bp.keyname)).toContain('ST3SV');
    });
  });
});
