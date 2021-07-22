import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Patient } from "./patient.entity";

@Entity()
export class AdniImage extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    imageUid: number;

    @ManyToOne(() => Patient, patient => patient.adniImages, {eager: false})
    patient: Patient;

    @Column()
    patientId?: number;
    
    @Column()
    examDate: Date;

    @Column()
    visCode: string;

}