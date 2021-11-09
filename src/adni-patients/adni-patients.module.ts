import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PatientRepository } from './patient.respository';
import { AdniPatientsController } from './adni-patients.controller';
import { AdniPatientsService } from './adni-patients.service';

@Module({
  imports: [TypeOrmModule.forFeature([PatientRepository])],
  controllers: [AdniPatientsController],
  providers: [AdniPatientsService],
})
export class PatientsModule {}
