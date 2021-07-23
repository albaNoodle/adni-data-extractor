import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

    @CreateDateColumn({ nullable: false, precision: null, default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    
    @UpdateDateColumn({ nullable: false, precision: null, default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}