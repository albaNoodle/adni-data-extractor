import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AdniImage } from "./adni-image.entity";
import { BrainPart } from "./brain-part.entity";

@Entity()
export class Phenotype extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => AdniImage, adniImage => adniImage.phenotypes, {eager: false})
    @JoinColumn({name: 'imageUid', referencedColumnName: 'imageUid'})
    adniImage: AdniImage;

    @Column()
    imageUid?: number;

    @ManyToOne(() => BrainPart)
    @JoinColumn({name: 'brainPartKeyname', referencedColumnName: 'keyname'})
    brainPart: BrainPart;

    @Column()
    brainPartKeyname?: string;

    @Column()
    value: number;

    @CreateDateColumn({ nullable: false, precision: null, default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    
    @UpdateDateColumn({ nullable: false, precision: null, default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}