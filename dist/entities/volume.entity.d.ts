import { BaseEntity } from "typeorm";
import { AdniImage } from "./adni-image.entity";
export declare class Volume extends BaseEntity {
    id: number;
    adniImage: AdniImage;
    imageUid?: number;
    value: number;
}
