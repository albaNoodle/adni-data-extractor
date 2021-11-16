import { Console } from 'console';
import { Patient } from 'src/entities/patient.entity';
import { Diagnosis } from 'src/enums/diagnosis.enum';
import { EntityRepository, OrderByCondition, Repository } from 'typeorm';
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
