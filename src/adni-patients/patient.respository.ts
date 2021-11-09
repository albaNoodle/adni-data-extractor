import { Patient } from 'src/entities/patient.entity';
import { EntityRepository, Repository } from 'typeorm';
import { PatientCreateDto } from './dto/patient.create.dto';

@EntityRepository(Patient)
export class PatientRepository extends Repository<Patient> {
  async createPatient(patientCreateDto: PatientCreateDto): Promise<Patient> {
    const { rid, ptid, diagnosis, gender, birthMonth, birthYear } = patientCreateDto;
    const patient = this.create();
    patient.rid = rid;
    patient.ptid = ptid;
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
}
