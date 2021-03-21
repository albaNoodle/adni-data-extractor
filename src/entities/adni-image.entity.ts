import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Patient } from "./patient.entity";

@Entity()
export class AdniImage extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Patient, patient => patient.images, {eager: true})
    patient: Patient;

    @Column()
    patientId?: number;
}