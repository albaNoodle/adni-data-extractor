import { AdniImage } from "src/entities/adni-image.entity";
import { EntityRepository, Repository } from "typeorm";
import { AdniImageCreateDto } from "./dto/adni-image.create.dto";

@EntityRepository(AdniImage)
export class AdniImageRepository extends Repository<AdniImage>{ 
    async createAdniImage(adniImageCreateDto: AdniImageCreateDto): Promise<AdniImage> {
        const { imageUid, patientId, visCode, examDate } = adniImageCreateDto;
        const adniImage = this.create();
        adniImage.imageUid = imageUid;
        adniImage.patientId = patientId;
        adniImage.visCode = visCode;
        adniImage.examDate = new Date(examDate);
        return adniImage.save();
    }
}