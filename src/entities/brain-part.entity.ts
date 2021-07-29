import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class BrainPart extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    key: string;

    @Column()
    humanName: string;

    @CreateDateColumn({ nullable: false, precision: null, default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;
    
    @UpdateDateColumn({ nullable: false, precision: null, default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}