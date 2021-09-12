import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AdniImage } from "./adni-image.entity";
import { Patient } from "./patient.entity";

@Entity()
export class PatientVisit extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => AdniImage, image => image.patientVisit)
    @JoinColumn({name: 'imageUid', referencedColumnName: 'imageUid'})
    adniImage: AdniImage;

    @Column()
    imageUid?: number;

    @ManyToOne(() => Patient, patient => patient.patientVisits, {eager: false})
    @JoinColumn({name: 'rid', referencedColumnName: 'rid'})
    patient: Patient;

    @Column()
    rid?: number;
    
    @Column()
    scanDate: Date;

    @Column()
    visit: string;

    @CreateDateColumn({ nullable: false, precision: null, default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    
    @UpdateDateColumn({ nullable: false, precision: null, default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}