import { Test, TestingModule } from '@nestjs/testing';
import { AdniPatientsController } from './adni-patients.controller';

describe('AdniPatientsController', () => {
  let controller: AdniPatientsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AdniPatientsController],
    }).compile();

    controller = module.get<AdniPatientsController>(AdniPatientsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
