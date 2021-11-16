import { Diagnosis } from '../enums/diagnosis.enum';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { PatientVisit } from './patient-visit.entity';

@Entity()
export class Patient extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  rid: number;

  @Column()
  ptid: string;

  @Column()
  phase: string;

  @Column()
  diagnosis: Diagnosis;

  @OneToMany(() => PatientVisit, (patientVisit) => patientVisit.patient)
  patientVisits: PatientVisit[];

  @Column()
  gender: number;

  @Column()
  birthYear: number;

  @Column()
  birthMonth?: number;
}
