import { Diagnosis } from "src/enums/diagnosis.enum";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AdniImage } from './adni-image.entity';

@Entity()
export class Patient extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: Diagnosis;

    @OneToMany(() => AdniImage, image => image.patient)
    adniImages: AdniImage[];
}