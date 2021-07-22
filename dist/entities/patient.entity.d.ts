import { Diagnosis } from "src/enums/diagnosis.enum";
import { BaseEntity } from "typeorm";
import { AdniImage } from './adni-image.entity';
export declare class Patient extends BaseEntity {
    id: number;
    diagnosis: Diagnosis;
    adniImages: AdniImage[];
}
