import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AdniImage } from "./adni-image.entity";

@Entity()
export class Volume extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => AdniImage, {eager: false})
    @JoinColumn({name: 'imageUid', referencedColumnName: 'imageUid'})
    adniImage: AdniImage;

    @Column()
    imageUid?: number;

    @Column()
    value: number;
}