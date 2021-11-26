import { Patient } from 'src/entities/patient.entity';
import { Diagnosis } from 'src/enums/diagnosis.enum';
import { EntityRepository, getConnection, OrderByCondition, Repository } from 'typeorm';
import { PatientCreateDto } from './dto/patient.create.dto';
import { PatientFilterDto } from './dto/patient.filter.dto';

@EntityRepository(Patient)
export class PatientRepository extends Repository<Patient> {
  async createPatient(patientCreateDto: PatientCreateDto): Promise<Patient> {
    const { rid, ptid, phase, diagnosis, gender, birthMonth, birthYear } = patientCreateDto;
    const patient = this.create();
    patient.rid = rid;
    patient.ptid = ptid;
    patient.phase = phase;
    patient.diagnosis = diagnosis;
    patient.gender = gender;
    patient.birthYear = birthYear;
    patient.birthMonth = birthMonth;
    return patient.save();
  }

  async updatePatient(patientCreateDto: PatientCreateDto): Promise<Patient> {
    return this.manager.transaction('SERIALIZABLE', async () => {
      await this.update({ rid: patientCreateDto.rid }, patientCreateDto);
      return this.findOne({ rid: patientCreateDto.rid });
    });
  }

  async createOrUpdatePatients(patientCreateDtos: PatientCreateDto[]) {
    return this.manager.transaction('SERIALIZABLE', async () => {
      const patients = patientCreateDtos.map((patientCreateDto) => {
        const { rid, ptid, phase, diagnosis, gender, birthMonth, birthYear } = patientCreateDto;
        const patient = this.create();
        patient.rid = rid;
        if (ptid) {
          patient.ptid = ptid;
        }
        patient.phase = phase;
        if (diagnosis) {
          patient.diagnosis = diagnosis;
        }
        if (gender) {
          patient.gender = gender;
        }
        if (birthYear) {
          patient.birthYear = birthYear;
        }
        if (birthMonth) {
          patient.birthMonth = birthMonth;
        }
        return patient;
      });

      // 'ptid'
      let patientsUpsert = patients.filter((p) => p.ptid);
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Patient)
        .values(patientsUpsert)
        .orUpdate({ conflict_target: ['rid', 'phase'], overwrite: ['ptid'] })
        .updateEntity(false)
        .execute();
      // 'diagnosis'
      patientsUpsert = patients.filter((p) => p.diagnosis);
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Patient)
        .values(patientsUpsert)
        .orUpdate({ conflict_target: ['rid', 'phase'], overwrite: ['diagnosis'] })
        .updateEntity(false)
        .execute();
      // 'gender'
      patientsUpsert = patients.filter((p) => p.gender);
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Patient)
        .values(patientsUpsert)
        .orUpdate({ conflict_target: ['rid', 'phase'], overwrite: ['gender'] })
        .updateEntity(false)
        .execute();
      // 'birthYear'
      patientsUpsert = patients.filter((p) => p.birthYear);
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Patient)
        .values(patientsUpsert)
        .orUpdate({ conflict_target: ['rid', 'phase'], overwrite: ['birthYear'] })
        .updateEntity(false)
        .execute();
      // 'birthMonth'
      patientsUpsert = patients.filter((p) => p.birthMonth);
      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(Patient)
        .values(patientsUpsert)
        .orUpdate({ conflict_target: ['rid', 'phase'], overwrite: ['birthMonth'] })
        .updateEntity(false)
        .execute();

      // await getConnection()
      //   .createQueryBuilder()
      //   .insert()
      //   .into(Patient)
      //   .values(patients)
      //   .orUpdate({ conflict_target: ['rid', 'phase'], overwrite: ['ptid', 'diagnosis', 'gender', 'birthYear', 'birthMonth'] })
      //   .updateEntity(false)
      //   .execute();
      // await Promise.all(phenotipes.map(async (p) => await p.reload()));

      return patients;
    });
  }

  async getPatients(patientFilterDto: PatientFilterDto): Promise<Patient[]> {
    const { fromYearBirth, toYearBirth, gender, diagnoses, phase } = patientFilterDto;
    let query = this.createQueryBuilder('p');

    const orderCondition: OrderByCondition = {};
    // >=
    if (fromYearBirth) {
      query.andWhere(`p.birthYear >= :fromYearBirth`, { fromYearBirth });
      orderCondition[`p.birthYear`] = 'ASC';
      orderCondition[`p.ptid`] = 'ASC';
    }

    // <=
    if (toYearBirth) {
      query.andWhere(`p.birthYear <= :toYearBirth`, { toYearBirth });
      orderCondition[`p.birthYear`] = 'DESC';
      orderCondition[`p.ptid`] = 'DESC';
    }

    if (gender) {
      query.andWhere(`p.gender = :gender`, { gender });
    }

    if (phase) {
      query.andWhere(`p.phase = :phase`, { phase });
    }

    // use default order?
    if (Object.keys(orderCondition).length === 0) {
      orderCondition[`p.ptid`] = 'ASC';
    }

    if (diagnoses && diagnoses.length > 0 && diagnoses.length < Object.keys(Diagnosis).length) {
      query.andWhere(`p.diagnosis IN (:diagnoses)`, { diagnoses });
    }

    query.orderBy(orderCondition);
    return query.getMany();
  }
}
