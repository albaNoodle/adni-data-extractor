import { BaseEntity } from "typeorm";
import { Patient } from "./patient.entity";
export declare class AdniImage extends BaseEntity {
    id: number;
    imageUid: number;
    patient: Patient;
    patientId?: number;
    examDate: Date;
    visCode: string;
}
