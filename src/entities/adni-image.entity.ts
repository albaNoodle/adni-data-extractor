import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { PatientVisit } from "./patient-visit.entity";
import { Phenotype } from "./phenotype.entity";

@Entity()
export class AdniImage extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    imageUid: number;

    @Column()
    rid: number;

    @ManyToOne(() => PatientVisit, patientVisit => patientVisit.adniImage, {eager: false})
    @JoinColumn([{name: 'rid', referencedColumnName: 'rid'}, {name: 'imageUid', referencedColumnName: 'imageUid'}])
    patientVisit: PatientVisit;

    // @Column()
    // patientVisitId?: number;
    
    @Column()
    examDate: Date;

    @Column()
    visCode: string;

    @OneToMany(() => Phenotype, phenotype => phenotype.adniImage, {eager: false})
    phenotypes: Phenotype[];

    @CreateDateColumn({ nullable: false, precision: null, default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    
    @UpdateDateColumn({ nullable: false, precision: null, default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}