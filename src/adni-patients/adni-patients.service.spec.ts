import { Test, TestingModule } from '@nestjs/testing';
import { AdniPatientsService } from './adni-patients.service';

describe('AdniPatientsService', () => {
  let service: AdniPatientsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdniPatientsService],
    }).compile();

    service = module.get<AdniPatientsService>(AdniPatientsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it.todo('create patients');

  it.todo('get patients');
});
