import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Patient } from 'src/entities/patient.entity';
import { PatientLoadInDto } from './dto/patient.load.in.dto';
import { PatientRepository } from './patient.respository';
import * as fs from 'fs';
import { PatientCreateDto } from './dto/patient.create.dto';
import { In } from 'typeorm';
import { PatientFilterDto } from './dto/patient.filter.dto';

@Injectable()
export class AdniPatientsService {
  constructor(
    @InjectRepository(PatientRepository)
    private patientRepository: PatientRepository
  ) {}

  async getPatients(patientFilterDto: PatientFilterDto): Promise<Patient[]> {
    return this.patientRepository.getPatients(patientFilterDto);
  }

  async getPatientsByPtids(patientsPtids: string[]): Promise<Patient[]> {
    return this.patientRepository.find({
      where: {
        ptid: In(patientsPtids),
      },
    });
  }

  async loadPatients(patientLoadInDto: PatientLoadInDto): Promise<Patient[]> {
    // this.patientRepository.loadPatients(patientLoadInDto);
    const patients: Promise<Patient>[] = [];
    const csvParser = require('csv-parser');
    let dirname = __dirname;
    const distIdx = dirname.indexOf('/dist');
    if (distIdx > 0) {
      dirname = dirname.substring(distIdx, -1);
    }
    const streamVisits = fs
      .createReadStream(
        // join(dirname, 'data', 'test', 'phenotypes.csv')
        patientLoadInDto.visitsPath
      )
      .pipe(csvParser())
      .on('end', () => {
        fs.close;
        // handle end of CSV
      });

    const patientsToProcessPartial: Partial<PatientCreateDto>[] = [];

    for await (const row of streamVisits) {
      const createPatient: Partial<PatientCreateDto> = {
        rid: row['RID'],
        ptid: row['PTID'],
        diagnosis: row['Screen.Diagnosis'],
      };
      if (!patientsToProcessPartial.find((p) => p.rid === createPatient.rid)) {
        // Dto not already existing
        patientsToProcessPartial.push(createPatient);
      }
    }

    const streamDemog = fs
      .createReadStream(patientLoadInDto.demogPath)
      .pipe(csvParser())
      .on('end', () => {
        fs.close;
        // handle end of CSV
      });

    const patientsToProcess: PatientCreateDto[] = [];

    for await (const row of streamDemog) {
      const createPatient: Partial<PatientCreateDto> = {
        rid: row['RID'],
        phase: row['Phase'],
        gender: row['PTGENDER'],
        birthMonth: row['PTDOBMM'],
        birthYear: row['PTDOBYY'],
      };
      const patientPartial = patientsToProcessPartial.find((p) => p.rid === createPatient.rid);
      if (!patientPartial) {
        throw new Error(`Patient with RID '${createPatient.rid}' not existing on visits file`);
      }
      patientsToProcess.push({
        rid: createPatient.rid,
        ptid: patientPartial.ptid,
        phase: createPatient.phase,
        diagnosis: patientPartial.diagnosis,
        gender: createPatient.gender,
        birthMonth: createPatient.birthMonth,
        birthYear: createPatient.birthYear,
      });
    }

    // Get patients Rid of the csvs patients
    const patientsRid = patientsToProcess.map((x) => x.rid);

    // Get patients Rid that are already on the database
    const patientsExisting = await this.patientRepository.find({ where: { rid: In(patientsRid) } });
    const patientsToCreate = patientsToProcess.filter((x) => !patientsExisting.map((p) => p.rid.toString()).includes(x.rid.toString()));
    const patientsToUpdate = patientsToProcess.filter((x) => patientsExisting.map((p) => p.rid.toString()).includes(x.rid.toString()));

    const patientsCreated = await Promise.all(
      patientsToCreate.map(async (patientToCreate) => {
        const patient = await this.patientRepository.createPatient(patientToCreate);
        return patient;
      })
    );

    const patientsUpdated = await Promise.all(
      patientsToUpdate.map(async (patientToUpdate) => {
        const patient = await this.patientRepository.updatePatient(patientToUpdate);
        return patient;
      })
    );

    return null;
  }
}
