import { Diagnosis } from "src/enums/diagnosis.enum";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AdniImage } from './adni-image.entity';
import { PatientVisit } from "./patient-visit.entity";

@Entity()
export class Patient extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    rid: number;

    @Column()
    ptid: string;
  
    @Column()
    diagnosis: Diagnosis;

    @OneToMany(() => PatientVisit, patientVisit => patientVisit.patient)
    patientVisits: PatientVisit[];
}